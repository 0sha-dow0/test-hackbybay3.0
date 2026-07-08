const fetch = require('node-fetch');
const { URL } = require('url');

const BASE_URL = process.env.UPSTREAM_URL || 'https://api.example.com';

async function getJson(path) {
  const url = new URL(path, BASE_URL);
  const res = await fetch(url.href);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

async function postJson(path, body) {
  const url = new URL(path, BASE_URL);
  const res = await fetch(url.href, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

module.exports = { getJson, postJson };