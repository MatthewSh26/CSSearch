## GGMatch – Telegram Mini App for CS2/Faceit Teammates

This project implements a Telegram Mini App that helps players find compatible teammates for CS2 / Faceit in a swipe-style, dating-like UI.

### Structure

- `backend` – Node.js + TypeScript API (Express) with PostgreSQL via Prisma.
- `miniapp` – React + TypeScript Telegram Mini App using `@tma.js`.
- `bot` – Telegram bot entrypoint that opens the Mini App and sends match notifications.

### Getting started

Prerequisites:

- Node.js 18+
- pnpm, npm, or yarn
- PostgreSQL (local or remote) for the backend

Basic flow:

1. Configure environment variables for `backend` and `bot` (see their `.env.example` files).
2. Install dependencies in each folder.
3. Run the backend API server.
4. Run the Mini App dev server and configure your Telegram bot to use its URL as a WebApp.

