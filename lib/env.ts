import * as z from "zod";

const envSchema = z.object({
	// General
	NODE_ENV: z.string().default("development"),

	DATABASE_URL: z.url(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
	console.error(z.prettifyError(env.error));
	process.exit(1);
}

export default env.data;
