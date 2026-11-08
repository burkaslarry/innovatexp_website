import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { restaurantUrl, parseRestaurant, mergeFacts } from './lib/openrice-coffee.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const write = process.argv.includes('--write');
if (process.argv.some(arg => arg.startsWith('--') && arg !== '--write')) throw new Error('Usage: node scripts/fetch-openrice-coffee.mjs [--write]');
const dataPath = path.join(root, 'src/data/hk-coffeeshops.json');
const shops = JSON.parse(await fs.readFile(dataPath, 'utf8'));
const queue = shops.map((shop, index) => ({ shop, index })).filter(({ shop }) => shop.openrice?.url);
if (!queue.length) throw new Error('No OpenRice restaurant source URLs configured');
const headers = { 'User-Agent': 'InnovateXPCoffeeDirectory/1.0 (+https://www.innovatexp.co)', 'Accept': 'text/html' };
const robotsByOrigin = new Map();
const changes = [];
for (const { shop, index } of queue) {
  try {
    const url = new URL(restaurantUrl(shop.openrice.url));
    if (!robotsByOrigin.has(url.origin)) {
      const res = await fetch(`${url.origin}/robots.txt`, { headers, signal: AbortSignal.timeout(20000), redirect: 'error' });
      if (!res.ok) throw new Error(`Cannot check robots.txt (${res.status})`);
      const robots = await res.text();
      if (/Security Check in Progress|BytePlus|<html/i.test(robots)) throw new Error('robots.txt unavailable');
      let active = false; const disallowed = [];
      for (const raw of robots.split('\n')) {
        const line = raw.split('#')[0].trim();
        if (/^User-Agent:/i.test(line)) active = line.split(':').slice(1).join(':').trim() === '*';
        else if (active && /^Disallow:/i.test(line)) disallowed.push(line.split(':').slice(1).join(':').trim());
      }
      robotsByOrigin.set(url.origin, disallowed.filter(Boolean));
    }
    if (robotsByOrigin.get(url.origin).some(prefix => url.pathname.startsWith(prefix))) throw new Error('Restaurant URL disallowed by robots.txt');
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(20000), redirect: 'error' });
    if (!res.ok) throw new Error(`OpenRice returned HTTP ${res.status}`);
    const html = await res.text();
    if (html.length > 5_000_000) throw new Error('Page exceeds import limit');
    const updated = mergeFacts(shop, parseRestaurant(html), url.href, new Date().toISOString());
    shops[index] = updated;
    changes.push({ name: shop.name, fields: updated.openrice.fields, url: url.href });
    console.log(`Fetched: ${shop.name}`);
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (error) {
    console.error(`Stopped at ${shop.name}: ${error.message}`);
    console.error('No data written. Do not bypass the security check.');
    process.exitCode = 1;
    break;
  }
}
if (!process.exitCode) {
  if (write) {
    // One atomic update only after every selected branch has succeeded.
    const temp = `${dataPath}.openrice-tmp`;
    await fs.writeFile(temp, `${JSON.stringify(shops, null, 2)}\n`, { flag: 'wx' });
    await fs.rename(temp, dataPath);
  }
  console.log(JSON.stringify({ mode: write ? 'updated' : 'preview', changes }, null, 2));
}
