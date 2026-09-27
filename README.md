# Crypto Price Ticker

A client-side crypto price ticker built with React, TypeScript, Vite, and Mantine.

The application displays real-time bid and ask prices, supports multiple subscribed instruments, and provides a dummy trade execution flow.

## Live Demo

**GitHub Pages:**
<https://bryanluwz.github.io/sparks-system-assignment/>

## Source Code

This repository contains the complete source code for the assignment.

## Features

- Real-time BTC/USD, ETH/USD and other crypto price tickers
- Mock price tickers for testing larger numbers of instruments
- Bid and ask price display
- Automatic price updates via Coinbase WebSocket
- Subscribe/unsubscribe to instruments
- Persistent ticker subscriptions using `localStorage`
- Mock price provider for testing larger numbers of instruments
- Dummy BUY/SELL execution
- Responsive ticker layout
- GitHub Pages deployment via GitHub Actions

## Tech Stack

- React
- TypeScript
- Vite
- Mantine
- SCSS Modules
- Coinbase WebSocket API

## Getting Started

### Install dependencies

```bash
yarn install
```

### Start development server

```bash
yarn start
```

### Build for production

```bash
yarn build
```

### Preview production build

```bash
yarn preview
```

## Architecture

Coinbase Websocket / Mock Data → Price Feed → Normalised Data → Ticker UI

Dummy trade execution is handled by a mock API that simulates a timeout and returns a success response.

## Performance Considerations

The application uses a shared WebSocket feed rather than creating an individual network request for each ticker. Previous attempts on individual API requests might trigger a rate limit or other restrictions from Coinbase API.

Mock instruments are available to test the UI with larger numbers of subscribed instruments without creating additional load on the external API.

## Deployment

The application is deployed using GitHub Pages.

GitHub Actions builds the Vite application and deploys the generated `dist` directory automatically when changes are pushed to the main branch.
