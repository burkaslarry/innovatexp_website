/**
 * Dev-only warmup: the first request for `/_next/static/css/app/layout.css` can 404
 * while Webpack is still emitting it. Prewarm after the dev server binds so the
 * browser’s parallel CSS request is less likely to miss.
 *
 * If you use `next dev --turbo`, that URL stays 404 (Turbopack); use plain `next dev`.
 *
 * Set NEXT_DISABLE_DEV_WARMUP=1 to skip. Does not run in production builds.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'edge') return;
  if (process.env.NODE_ENV !== 'development') return;
  if (process.env.NEXT_DISABLE_DEV_WARMUP === '1') return;

  const port = process.env.PORT || '3000';
  const host = '127.0.0.1';

  const warm = () => {
    void fetch(`http://${host}:${port}/`, { cache: 'no-store' }).catch(() => {});
  };

  setTimeout(warm, 600);
  setTimeout(warm, 2000);
}
