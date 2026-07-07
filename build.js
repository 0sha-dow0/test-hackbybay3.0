const { execSync } = require('child_process');

const files = [
  'src/server.js',
  'src/routes/products.js',
  'src/services/inventory.js',
  'src/clients/upstream.js',
  'test.js',
];

for (const file of files) {
  execSync(`node --check ${file}`, { stdio: 'inherit' });
}

console.log('build ok');
