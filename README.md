# LiquorPOS - Electron + React + Vite (Complete Starter)

## What's included
- Electron shell (main.js / preload.js)
- React + Vite frontend
- IndexedDB (Dexie) local database with sample products
- Cashier UI: search, add to cart, checkout (records sales, updates stock)
- Admin UI: inventory manager, CRM, sales reports (charts)
- GitHub Actions workflow for building installer (optional)

## Quick start (local)
1. Unzip project
2. `npm install`
3. `npm run dev` (dev mode)
4. `npm run build:web` then `npm run dist` to create Windows installer (requires electron-builder)

## Notes
- This starter uses IndexedDB (Dexie) for offline persistence to keep packaging simple.
- To publish releases automatically you can add `GH_TOKEN` to repo secrets and restore `publish` config in package.json.
