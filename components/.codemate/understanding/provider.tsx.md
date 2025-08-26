# High-Level Documentation

## Overview

This code establishes a set of context providers for a React/Next.js application to enable Ethereum wallet connectivity and blockchain interactions, primarily using **RainbowKit**, **wagmi**, and **React Query** ecosystems. It is designed for a client-side environment, typical in Next.js 13+ ("app" directory structure).

---

## Core Features

### 1. **Wallet & Blockchain Integration**

- **RainbowKit**: Provides a customizable UI for wallet connection.
- **wagmi**: A collection of React hooks for Ethereum, handling wallet connections, transactions, and state management.
- **QueryClient (React Query)**: Manages queries and caching for asynchronous blockchain data requests.

### 2. **Custom Blockchain Network**

- **Chain Definition**: Sets up a custom "Tenderly Mainnet Fork" chain with provided RPC URLs and blockchain properties.
- **Chains in Wagmi Config**: All providers/wallets interact with this custom fork rather than Ethereum or other public/test chains.

### 3. **Supported Wallets**

Configures a group labeled ‘REZORYA’ with the following wallet connectors:
- Bybit Wallet
- Trust Wallet
- WalletConnect
- MetaMask
- Injected Wallet (e.g., browser wallets like Coinbase Wallet)

### 4. **Provider Composition**

Wraps the app's children in the following provider hierarchy:
1. **WagmiProvider**: Supplies wagmi hooks and manages Ethereum state.
2. **QueryClientProvider**: Enables caching for data queries (useQuery, etc.).
3. **RainbowKitProvider**: Handles wallet connection UI and logic.

---

## Configuration Details

- **Custom Storage**: Stores wagmi connection state in browser cookies for persistence.
- **Custom RPC**: All requests are routed through the defined Tenderly Mainnet Fork RPC endpoint.
- **Project and App Metadata**: Uses a specific project ID and appName ('REZORYA') for wallet connections and WalletConnect integration.

---

## Usage

**Providers** exports a React component that is intended to wrap your application's layout or root component. It ensures that any child components have access to wallet connectivity, Ethereum state, and query management via context.

---

## Summary Table

| Provider Level        | Purpose                                            |
|----------------------|----------------------------------------------------|
| WagmiProvider        | Blockchain state, Ethereum hooks                   |
| QueryClientProvider  | Query/mutation caching (React Query)               |
| RainbowKitProvider   | Wallet connection components (UI)                  |
| Custom Chain         | Forked mainnet RPC; "Tenderly Mainnet Fork"        |
| Wallets Supported    | Bybit, Trust, WalletConnect, MetaMask, Injected    |
| Storage              | Cookie-based for session persistence               |

---

## Intended Audience

- Next.js 13+ developers
- DApp creators needing custom chain/wallet integration
- Projects using Tenderly as a mainnet development/fork environment

---

## Exclusions

This code does **not** include:
- Any UI components for wallet connection; it only sets up the context/providers.
- Actual usage examples or integration in pages/layouts.
- Business logic interacting with the blockchain; it lays the foundation only.

---

**In summary**, this component serves as a foundational wrapper for dApps using Next.js, equipping them with wallet connection, custom chain support, and react-query powered state management.