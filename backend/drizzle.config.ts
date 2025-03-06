import { defineConfig } from "drizzle-kit";

import { DB_URL } from "./src/constants";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/components/database/schema.ts",
  dbCredentials: {
    url: DB_URL,
  },
});
