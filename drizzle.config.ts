import env from "./lib/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./db/schema/index.ts",
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
