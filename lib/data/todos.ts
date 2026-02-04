import { db } from "@/db";
import { NewTodo, Todo, todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ResultAsync } from "neverthrow";

type TodoError = { reason: "DB_ERROR"; message: string };

export function getTodos({ offset = 0, limit = 10 }: { offset: number; limit: number }) {
	return ResultAsync.fromPromise(db.select().from(todos).offset(offset).limit(limit), handleDBError);
}

export function insertTodo({ title, description, thumbnail, user }: NewTodo) {
	return ResultAsync.fromPromise(
		db.insert(todos).values({
			title,
			description,
			thumbnail,
			user,
		}),
		handleDBError,
	);
}

export function deleteTodo({ id }: Todo) {
	return ResultAsync.fromPromise(db.delete(todos).where(eq(todos.id, id)), handleDBError);
}

export function updateTodo(id: number, values: NewTodo) {
	return ResultAsync.fromPromise(db.update(todos).set(values).where(eq(todos.id, id)), handleDBError);
}

// Helper function
const handleDBError = (err: unknown): TodoError => {
	console.error(err);
	return { reason: "DB_ERROR", message: "Error getting todos" };
};
