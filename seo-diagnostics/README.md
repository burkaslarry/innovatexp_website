# SEO Diagnostics

`seo:check` compares rendered HTML for two user agents:
- Chrome desktop
- Googlebot smartphone

It checks these URLs:
- `/`
- `/smartsales-crm`
- `/eventxp`
- `/ai-consulting`

For each URL and user agent, it outputs:
- status code
- content-type
- HTML length
- whether `<h1>` exists (fail if missing)
- whether page contains `expectedSnippet` (fail if missing)

## Run Locally

Start app first:

`npm run dev`

Then run:

`BASE_URL=http://localhost:3000 npm run seo:check`

## Run Against Production

`BASE_URL=https://innovatexp.co npm run seo:check`
