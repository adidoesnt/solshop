// Server
const PORT = process.env.PORT ?? 3000;

// Postgres
const POSTGRES_USER = process.env.POSTGRES_USER ?? "solshop";
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ?? "solshop";
const POSTGRES_DB = process.env.POSTGRES_DB ?? "solshop";
const DB_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5433/${POSTGRES_DB}`;

export { PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, DB_URL };
