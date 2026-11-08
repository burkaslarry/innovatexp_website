// Only import restaurant facts explicitly present in structured page data.
export function restaurantUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || !['www.openrice.com', 'www1.openrice.com'].includes(url.hostname) ||
      !/^\/(en|zh|zh-cn)\/hongkong\/r-[^/]+-r\d+\/?$/.test(url.pathname)) {
    throw new Error('Expected an HTTPS OpenRice Hong Kong restaurant detail URL');
  }
  url.search = ''; url.hash = '';
  return url.href;
}

export function parseRestaurant(html) {
  if (/Security Check in Progress|BytePlus|captcha|verify you are human/i.test(html)) {
    throw new Error('OpenRice security check: no restaurant data imported');
  }
  const candidates = [];
  function visit(value) {
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== 'object') return;
    const types = [value['@type']].flat();
    if (types.some(type => ['Restaurant', 'CafeOrCoffeeShop'].includes(type))) candidates.push(value);
    if (value['@graph']) visit(value['@graph']);
  }
  for (const match of html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { visit(JSON.parse(match[1])); } catch { /* Some unrelated structured blocks may be malformed. */ }
  }
  if (candidates.length !== 1) throw new Error('Expected one restaurant in JSON-LD; preserve existing data');
  const item = candidates[0];
  if (typeof item.name !== 'string' || !item.name.trim()) throw new Error('Restaurant name missing');
  const facts = { name: item.name.trim() };
  const address = item.address;
  if (typeof address === 'string' && address.trim()) facts.address = address.trim();
  else if (address?.streetAddress) {
    facts.address = [address.streetAddress, address.addressLocality, address.addressRegion,
      typeof address.addressCountry === 'string' ? address.addressCountry : address.addressCountry?.name]
      .filter(value => typeof value === 'string' && value.trim()).join(', ');
  }
  if (typeof item.telephone === 'string') facts.phone = item.telephone;
  if (Array.isArray(item.openingHours) && item.openingHours.every(value => typeof value === 'string')) facts.openingHours = item.openingHours;
  // Missing Wi-Fi is unknown, never evidence of no Wi-Fi. Do not scan reviews.
  for (const feature of Array.isArray(item.amenityFeature) ? item.amenityFeature : []) {
    if (/^(wi-?fi|wireless internet)$/i.test(feature.name ?? '') && typeof feature.value === 'boolean') facts.wifi = feature.value ? 'yes' : 'no';
  }
  return facts;
}

export function mergeFacts(shop, facts, url, checkedAt) {
  if (shop.name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '') !== facts.name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')) {
    throw new Error(`Restaurant name mismatch: ${shop.name} / ${facts.name}`);
  }
  return { ...shop, ...facts, openrice: { url: restaurantUrl(url), checkedAt, fields: Object.keys(facts) } };
}
