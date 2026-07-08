const fetch = require('node-fetch');

const BASE_URL = process.env.UPSTREAM_URL || 'https://api.example.com';

async function getJson(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw res;
  return res.json();
}

async function postJson(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw res;
  return res.json();
}

module.exports = { getJson, postJson };