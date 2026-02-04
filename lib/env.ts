import { createEnv } from "@t3-oss/env-nuxt";
import * as z from "zod";

const env = createEnv({
	server: {
		// General
		NODE_ENV: z.string().default("development"),

		// Database
		DATABASE_URL: z.url(),
	},
	client: {},
});

export default env;
