// Postgres
const POSTGRES_USER = process.env.POSTGRES_USER ?? "solshop";
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ?? "solshop";
const POSTGRES_DB = process.env.POSTGRES_DB ?? "solshop";
const DB_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5433/${POSTGRES_DB}`;

// Solace
const SOLACE_HOST = process.env.SOLACE_HOST ?? "tcp://localhost:55554";
const SOLACE_USERNAME = process.env.SOLACE_USERNAME ?? "solshop";
const SOLACE_PASSWORD = process.env.SOLACE_PASSWORD ?? "password";
const SOLACE_VPN_NAME = process.env.SOLACE_VPN_NAME ?? "default";

// Product
export const REQUESTS_QUEUE = "requests";

export {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  DB_URL,
  SOLACE_HOST,
  SOLACE_USERNAME,
  SOLACE_PASSWORD,
  SOLACE_VPN_NAME,
};
