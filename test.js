// Minimal smoke test suite (TAP). Run: npm test
console.log('TAP version 13');
console.log('1..4');

function check(n, name, fn) {
  try {
    fn();
    console.log(`ok ${n} - ${name}`);
  } catch (err) {
    console.log(`not ok ${n} - ${name}`);
    console.log(`# ${err.message}`);
  }
}

check(1, 'server module loads', () => require('./src/server'));
check(2, 'products router loads', () => require('./src/routes/products'));
check(3, 'inventory service loads', () => require('./src/services/inventory'));
check(4, 'upstream client loads', () => require('./src/clients/upstream'));
