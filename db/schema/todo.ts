import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const todos = pgTable(
	"todos",
	{
		id: serial("id").primaryKey(),
		title: text("title").notNull(),
		description: text("description").notNull(),
		user: text("user").notNull(),
		thumbnail: text("thumbnail"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => {
		return { userIdx: index("user_idx").on(table.user) };
	},
);

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
