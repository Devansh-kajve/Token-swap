# Development Notes

## Assumptions

**Pricing**

- All prices in USD, hardcoded
- No real-time price feeds
- Exchange rate = fromPrice / toPrice

**Wallet**

- Mock connection, no actual Web3
- Balances are hardcoded
- No real transaction signing

**Tokens**

- All follow ERC-20 standard (18 decimals, except USDC with 6)
- No special token mechanics (fees, rebasing, etc)
- Assumed infinite liquidity

**UX**

- Instant calculations (no API latency)
- No slippage actually applied (just displayed)
- Transaction "succeeds" after 2 second delay

## Architecture Decisions

**Why modular (hooks + lib) instead of container/presentation?**
Went with custom hooks because the logic is complex enough to warrant extraction. Container/presentation would've been simpler for a quick prototype, but this approach makes it easier to:

- Add new pages that reuse the same swap logic
- Test calculations without mounting components
- Swap mock wallet for real Web3 later

The tradeoff is more files to manage, but for anything beyond a throwaway demo, the separation pays off. If this was just a 1-hour coding challenge, I would've kept everything in one file.

**Why custom hooks?**
Separates logic from UI. Makes it easier to:

- Test calculations independently
- Reuse wallet/swap logic on other pages
- Swap out mock data for real blockchain later

**Why lib utilities?**
Pure functions for calculations. No React dependencies means:

- Easy to test
- Works in Node/backend if needed
- Clear separation from state management

**File organization**
Grouped by function (hooks/, components/, lib/) rather than by feature. Easier to find "where does calculation logic live" vs "where's the ETH swap page".

## What I'd Improve

**Short term**

- Add TypeScript for type safety
- Unit tests for calculator functions
- Debounce input changes (currently recalculates every keystroke)
- Better error messages (show why swap failed)

**Medium term**

- Real price API (CoinGecko)
- Actual wallet connection (wagmi or ethers.js)
- Multi-chain support (add Polygon, Arbitrum)
- Price charts (TradingView widget)

**Long term**

- Real swap execution (Uniswap SDK)
- Multi-hop routing (ETH → USDC → DAI for better prices)
- Limit orders
- Portfolio tracking

## Known Limitations

- No price impact calculation
- No gas estimation
- Balance doesn't decrease after swap
- Settings (slippage/deadline) shown but not enforced
- Assumes user always has enough balance

## Tech Debt

- Some components are getting large (SwapPage ~200 lines)
- No loading states between token selections
- Validation could be more granular (min/max amounts)
- No error boundaries for crashes
