import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any>;
export type SqlQuery = Promise<Row[]> & { query: string; values: unknown[] };
export type Sql = ((strings: TemplateStringsArray, ...values: unknown[]) => SqlQuery) & {
  transaction: (queries: SqlQuery[]) => Promise<Row[][]>;
};
type Query = (text: string, values: unknown[]) => Promise<{ rows: Row[] }>;
export type DatabaseExecutor = { query: Query; transaction: <T>(fn: (tx: { query: Query }) => Promise<T>) => Promise<T> };

const pools = new Map<string, Pool>();
let testExecutor: DatabaseExecutor | null = null;

/** Routes every query to an in-process database; tests only. */
export function setTestDatabase(executor: DatabaseExecutor | null) {
  testExecutor = executor;
}

function poolExecutor(url: string): DatabaseExecutor {
  let pool = pools.get(url);
  if (!pool) {
    const local = /@(localhost|127\.0\.0\.1)(:|\/)/.test(url);
    // The Render database is shared by several apps under a 103-connection cap.
    pool = new Pool({ connectionString: url, ssl: local ? undefined : { rejectUnauthorized: true }, max: 3, idleTimeoutMillis: 5_000, connectionTimeoutMillis: 10_000 });
    pool.on("error", () => console.error("Database pool client error"));
    attachDatabasePool(pool);
    pools.set(url, pool);
  }
  const p = pool;
  return {
    query: (text, values) => p.query(text, values),
    async transaction(fn) {
      const client = await p.connect();
      let broken = false;
      try {
        await client.query("BEGIN");
        const result = await fn(client);
        await client.query("COMMIT");
        return result;
      } catch (error) {
        await client.query("ROLLBACK").catch(() => { broken = true; });
        throw error;
      } finally {
        client.release(broken);
      }
    },
  };
}

export function sqlFor(url: string): Sql {
  const exec = testExecutor ?? poolExecutor(url);
  const tag = (strings: TemplateStringsArray, ...values: unknown[]) => {
    const query = strings.reduce((text, part, i) => text + (i ? `$${i}` : "") + part, "");
    let running: Promise<Row[]> | undefined;
    // Lazy like the previous driver, so queries passed to transaction() are not also run on their own.
    const run = () => (running ??= exec.query(query, values).then((r) => r.rows));
    return {
      query, values,
      then: (resolve, reject) => run().then(resolve, reject),
      catch: (reject) => run().catch(reject),
      finally: (done) => run().finally(done),
      [Symbol.toStringTag]: "Promise",
    } as SqlQuery;
  };
  tag.transaction = (queries: SqlQuery[]) => exec.transaction(async (tx) => {
    const results: Row[][] = [];
    for (const q of queries) results.push((await tx.query(q.query, q.values)).rows);
    return results;
  });
  return tag;
}

export function databaseSql(): Sql | null {
  const url = process.env.DATABASE_URL?.trim();
  return url ? sqlFor(url) : null;
}
