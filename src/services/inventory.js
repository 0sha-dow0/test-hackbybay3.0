const fetch = require('node-fetch');

async function checkStock(productId) {
  try {
    const res = await fetch(`https://inventory.internal/stock/${productId}`);
    if (!res.ok) {
      if (res.status === 404) return 0;
      throw res;
    }
    return (await res.json()).count;
  } catch (err) {
    throw err;
  }
}

// VULN: SSRF — a caller-supplied URL is fetched with no allowlist or validation.
async function fetchFromSource(sourceUrl) {
  const res = await fetch(sourceUrl);
  if (!res.ok) throw res;
  return res.json();
}

module.exports = { checkStock, fetchFromSource };