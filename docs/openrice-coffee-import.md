# Creative Studio OpenRice sources

Coffee records can carry `openrice.url` for their exact restaurant branch. Creative Studio shows the source link and, after a successful direct fetch, its check date.

Preview structured restaurant data:

```sh
node scripts/fetch-openrice-coffee.mjs
```

Apply the preview to the directory:

```sh
node scripts/fetch-openrice-coffee.mjs --write
```

The importer checks robots.txt, spaces requests, validates branch names, and reads only Restaurant/CafeOrCoffeeShop JSON-LD. It imports available names, addresses, phone, opening hours and explicit Wi-Fi amenities. It does not infer power sockets, table sizes, music, spending rules or time limits from missing fields or reviews. It does not copy reviews or photographs.

On 2026-10-13, direct OpenRice requests returned a BytePlus security-check page with HTTP 200. Direct live import is currently blocked. The importer detects this and leaves all directory data unchanged. Source links are references, not a claim of successful live synchronization. Add exact branch links as sources become available. No automatic schedule is configured.
