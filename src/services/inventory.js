// Aliased axios import: a plain grep for "axios" call sites misses "http.get(...)".
// DepCover's call-site graph catches it.
const http = require('axios');

async function checkStock(productId) {
  try {
    const res = await http.get(`https://inventory.internal/stock/${productId}`);
    return res.data.count;
  } catch (err) {
    // Correctness here DEPENDS on axios throwing on a 404. Native fetch does NOT
    // throw on non-2xx, so a naive axios->fetch swap silently breaks this branch.
    if (err.response && err.response.status === 404) {
      return 0;
    }
    throw err;
  }
}

// VULN: SSRF — a caller-supplied URL is fetched with no allowlist or validation.
async function fetchFromSource(sourceUrl) {
  const res = await http.get(sourceUrl);
  return res.data;
}

module.exports = { checkStock, fetchFromSource };
