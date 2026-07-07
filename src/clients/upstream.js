const axios = require('axios');

const BASE_URL = process.env.UPSTREAM_URL || 'https://api.example.com';

async function getJson(path) {
  const res = await axios.get(`${BASE_URL}${path}`);
  return res.data;
}

async function postJson(path, body) {
  const res = await axios.post(`${BASE_URL}${path}`, body);
  return res.data;
}

module.exports = { getJson, postJson };
