import { type Config } from "drizzle-kit";

// import all the environment variables"

const postgresUrl = process.env.POSTGRES_URL;
export default {
  schema: "./app/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: postgresUrl!,
  },
  tablesFilter: ["images_*"],
} satisfies Config;

