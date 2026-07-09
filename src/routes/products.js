const express = require('express');
const { getJson, postJson } = require('../clients/upstream');
const { checkStock, fetchFromSource } = require('../services/inventory');

const router = express.Router();
const products = new Map();

router.get('/', async (req, res) => {
  res.json(Array.from(products.values()));
});

router.get('/:id', async (req, res) => {
  const product = products.get(req.params.id);
  if (!product) return res.status(404).json({ error: 'not found' });
  const stock = await checkStock(req.params.id);
  res.json({ ...product, stock });
});

router.post('/', async (req, res) => {
  const id = String(products.size + 1);
  const product = { id, name: req.body.name, price: req.body.price };
  products.set(id, product);
  await postJson('/audit', { action: 'create', id });
  res.status(201).json(product);
});

router.put('/:id', async (req, res) => {
  // VULN: missing authorization / IDOR — any caller can modify any product.
  const product = products.get(req.params.id);
  if (!product) return res.status(404).json({ error: 'not found' });
  product.name = req.body.name;
  product.price = req.body.price;
  res.json(product);
});

router.delete('/:id', async (req, res) => {
  // VULN: missing authorization / IDOR — no ownership check before deletion.
  products.delete(req.params.id);
  res.status(204).end();
});

router.get('/catalog/sync', async (req, res) => {
  const external = await getJson('/catalog');
  res.json({ synced: external });
});

router.get('/proxy/source', async (req, res) => {
  // VULN: SSRF passthrough of an unvalidated user URL.
  const data = await fetchFromSource(req.query.url);
  // VULN: reflected unvalidated input in the response body.
  res.send(`fetched from ${req.query.url}: ${JSON.stringify(data)}`);
});

module.exports = router;