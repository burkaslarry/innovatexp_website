import assert from 'node:assert/strict';
import test from 'node:test';
import { parseRestaurant, mergeFacts, restaurantUrl } from '../scripts/lib/openrice-coffee.mjs';
const url = 'https://www.openrice.com/en/hongkong/r-coffee-by-zion-western-district-western-r525933';
test('security pages never replace the directory even with HTTP 200', () => {
  assert.throws(() => parseRestaurant('<html>BytePlus Security Check in Progress...</html>'), /security check/);
});
test('imports structured facts and preserves unspecified working amenities', () => {
  const facts = parseRestaurant(`<script type="application/ld+json">${JSON.stringify({ '@graph': [{ '@type': 'CafeOrCoffeeShop', name: 'Coffee by Zion', address: { streetAddress: '83 First Street', addressLocality: 'Sai Ying Pun' } }] })}</script>`);
  const merged = mergeFacts({ name: 'Coffee by Zion', address: 'old', wifi: 'unknown', tableFor2: true }, facts, url, '2026-10-13T00:00:00Z');
  assert.equal(merged.address, '83 First Street, Sai Ying Pun');
  assert.equal(merged.wifi, 'unknown');
  assert.equal(merged.tableFor2, true);
  assert.equal(merged.openrice.checkedAt, '2026-10-13T00:00:00Z');
});
test('rejects branch name mismatches and off-site links', () => {
  assert.throws(() => mergeFacts({ name: 'NOC' }, { name: 'Other Cafe' }, url, ''), /mismatch/);
  assert.throws(() => restaurantUrl('https://www.openrice.com.evil.test/en/hongkong/r-cafe-r123'));
  assert.throws(() => restaurantUrl('https://www.openrice.com/service/private'));
});
