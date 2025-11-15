# Token Swap DEX

A simple decentralized exchange interface for swapping tokens. Built as a frontend test project.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Lucide React (icons)

## Features

- Swap between ETH, BNB, USDC, and DAI
- Real-time token ↔ USD conversion
- Mock wallet connection
- Transaction flow simulation
- Settings (slippage, deadline)

## Structure

```
src/
├── components/     # UI components
├── hooks/          # Custom hooks for logic
├── lib/            # Utilities (calculations, validation)
├── constants/      # Token configs
└── pages/          # Main swap page
```

## Adding Tokens

Edit `src/constants/tokens.js`:

```javascript
export const TOKENS = [
  {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    priceUsd: 150,
    decimals: 9,
    color: "bg-purple-500",
  },
  // ... existing tokens
];
```

## Build

```bash
npm run build
npm run preview  # test production build
```

## 🌐 Live Demo

**[View Live Demo](https://tokenswapdex.netlify.app/)**

## 🚀 Deployment

This app is deployed on Vercel. Every push to `main` branch automatically deploys.

## Notes

This is a demo app - no real blockchain transactions happen. Prices are hardcoded and wallets are simulated.
