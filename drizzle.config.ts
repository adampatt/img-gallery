import { type Config } from "drizzle-kit";
import { drizzle } from 'drizzle-orm/neon-http';

// import all the environment variables"

const postgresUrl = process.env.POSTGRES_URL;
export default {
  schema: "./app/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: postgresUrl!,
  },
  tablesFilter: ["t3gallery_*"],
} satisfies Config;

