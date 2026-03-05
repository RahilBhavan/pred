# Pred Liquidity Bot: Technical Proposal

## Overview
Pred is a high-performance, non-custodial P2P prediction market on the Base blockchain. Unlike AMMs, Pred relies on a Central Limit Order Book (CLOB). To ensure market efficiency and user experience, this project implements a professional-grade Market Making (MM) bot designed to provide consistent liquidity, narrow spreads, and deep order books.

## Core Objectives
1.  **Liquidity Provision:** Maintain a two-sided market (Buy/Sell) on high-volume sports markets (EPL, CFB).
2.  **Spread Capture:** Profit from the bid-ask spread while minimizing inventory risk.
3.  **Inventory Management:** Dynamically adjust quotes based on accumulated positions to stay delta-neutral.
4.  **High Reliability:** 24/7 uptime with sub-200ms response times for order book updates.

## Technical Architecture

### 1. Strategy Engine (`src/engine/`)
-   **Market Making Logic:** Implements a dynamic quoting strategy (e.g., Avellaneda-Stoikov or basic spread-based quoting).
-   **Pricing Model:** Integrates with external oracles (Sportmonks, TheRundown) or uses the current mid-price to set quotes.
-   **Risk Management:** Hard limits on maximum position size, drawdowns, and per-market exposure.

### 2. Execution Layer (`src/execution/`)
-   **API Client:** A robust, asynchronous wrapper for the Pred CLOB API.
-   **Order Manager:** Handles the lifecycle of limit orders (Place, Cancel, Replace).
-   **WebSocket Handler:** Real-time synchronization of the local order book with Pred's matching engine.

### 3. Monitoring & Analytics (`src/telemetry/`)
-   **Performance Tracking:** Real-time PnL, fill rates, and uptime.
-   **Logging:** Structured logging for auditing every trade and decision.

## Development Workflow & Best Practices

### Security First
-   **Secret Management:** No private keys or API keys in code. Use `.env` or AWS Secrets Manager.
-   **Non-Custodial:** The bot signs transactions locally; keys never leave the secure environment.
-   **Scanning:** Automated dependency vulnerability scanning (Snyk/GitHub Dependabot).

### CI/CD Pipeline
-   **Linting & Formatting:** `ruff` and `black` for Python code quality.
-   **Testing:** 80%+ coverage with `pytest`, including mocks for the API.
-   **GitHub Actions:**
    -   `test.yml`: Runs on every PR.
    -   `deploy.yml`: Deploys the bot to a containerized environment (Docker) on every merge to `main`.

## Roadmap
1.  **Phase 1 (Scaffolding):** Project structure, API client development, and basic mocking.
2.  **Phase 2 (Strategy):** Implementation of the quoting logic and inventory management.
3.  **Phase 3 (Execution):** Live testing on Pred's staging/testnet environment.
4.  **Phase 4 (Scale):** Multi-market support and advanced risk controls.
