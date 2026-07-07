const express = require('express');
const productsRouter = require('./routes/products');

const app = express();
app.use(express.json());
app.use('/products', productsRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => console.log(`test-hackbybay3.0 listening on ${port}`));
}

module.exports = app;
