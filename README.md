# SolShop

A mock e-commerce site built with SvelteKit, NodeJS, PostgreSQL, Drizzle and Solace.

## Setup

1. Run `docker compose up -d` to start the PostgreSQL and Solace containers.
2. Run `bun run db:push` to push the Drizzle schema to the database.
3. Run `cd backend && bun install` to install the backend dependencies.
4. Run `cd backend && bun dev` to start the backend development server.
5. Run `cd frontend && bun install` to install the frontend dependencies.
6. Run `cd frontend && bun dev` to start the frontend development server.

## Tech Stack

- SvelteKit
- NodeJS
- PostgreSQL
- Drizzle ORM
- Solace
