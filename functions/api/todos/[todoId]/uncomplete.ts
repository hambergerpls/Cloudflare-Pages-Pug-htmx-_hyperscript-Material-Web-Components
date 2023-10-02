import { header } from "../../../../src/html";
import { Todo, TodoHTML } from "../../../../src/todo";
import { Env } from "../../../../worker-configuration";

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const todo = await context.env.TODO_DB.prepare('UPDATE Todos SET completed = false WHERE id = ? RETURNING *').bind(context.params.todoId).first<Todo>();

    if (todo === null) {
        return new Response('', { status: 404 });
    }

    return new Response(
        TodoHTML({ id: todo.id, title: todo.title, completed: todo.completed })
        , header);
}