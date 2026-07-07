# test-hackbybay3.0

A small **Express CRUD API** for `products`, intentionally built as an **educational security-testing target** for [DepCover](https://github.com/) — an impact-analysis + autonomous dependency-transplant engine (axios → fetch).

> ⚠️ This app is deliberately vulnerable. Do **not** deploy it. It exists so a security tool can scan it, prove the blast radius, and transplant the flagged dependency.

## Endpoints
- `GET /products` — list products
- `GET /products/:id` — get one (fetches live stock from an inventory service)
- `POST /products` — create
- `PUT /products/:id` — update
- `DELETE /products/:id` — delete
- `GET /products/catalog/sync` — sync from an upstream catalog
- `GET /products/proxy/source?url=…` — proxy fetch (see SSRF below)
- `GET /health`

## Why it's a good transplant target
`axios` (pinned to an old `0.21.1`) is used across four files, including:
- a **shared client module** (`src/clients/upstream.js`),
- an **aliased import** (`const http = require('axios')` in `src/services/inventory.js`) that a plain grep for `axios` call sites would miss — the graph catches it,
- a **404-dependent call site**: `checkStock` relies on **axios throwing on a 404**. Native `fetch` does *not* throw on non-2xx, so a naive swap silently breaks that branch — exactly the semantic gap DepCover's behavioral diff is designed to catch.

## Intentional vulnerabilities (documented, educational)
- **Outdated dependency** — `axios@0.21.1` (known SSRF/redirect CVEs).
- **SSRF** — `GET /products/proxy/source?url=…` fetches an unvalidated, caller-supplied URL (`fetchFromSource`).
- **IDOR / missing authorization** — `PUT` and `DELETE /products/:id` perform no ownership/authz check.
- **Reflected input** — the proxy route echoes unvalidated user input into the response.

## Run
```bash
npm install
npm test      # TAP smoke tests
npm run build # node --check on every source file
npm start     # listens on :3000
```
