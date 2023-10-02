import { header } from "../../../../src/html";
import { Todo, TodoHTML } from "../../../../src/todo";
import { Env } from "../../../../worker-configuration";

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const todo = await context.env.TODO_DB.prepare('SELECT * FROM Todos WHERE id = ?').bind(context.params.todoId).first<Todo>();

    if (todo === null) {
        return new Response('', { status: 404 });
    }

    return new Response(
        TodoHTML({
            id: todo.id,
            title: todo.title,
            completed: todo.completed
        })
        , header);
}

export const onRequestDelete: PagesFunction<Env> = async (context) => {
    await context.env.TODO_DB.prepare('DELETE FROM Todos WHERE id = ?').bind(context.params.todoId).run();
    return new Response(undefined, { status: 200 });
}