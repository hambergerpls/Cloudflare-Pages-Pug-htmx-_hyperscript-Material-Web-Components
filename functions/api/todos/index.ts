import { header, html } from "../../../src/html";
import { Env } from "../../../worker-configuration";
import { Todo, TodoHTML, TodoPost } from "../../../src/todo";
import _ from 'lodash';

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { results } = await context.env.TODO_DB.prepare('SELECT * FROM Todos').all<Todo>();

    return new Response(html`
    <md-list id="todo-items" hx-target="closest li" hx-swap="outerHTML">
        ${results.map(todo => TodoHTML({ id: todo.id, title: todo.title, completed: todo.completed })).join('')}
    </md-list>
    `, header);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const formData = await context.request.formData();
    const todoInput: TodoPost = { title: formData.get('title')! as string };
    const { results, error } = await context.env.TODO_DB.prepare('INSERT INTO Todos (title, completed) VALUES (?, ?) RETURNING *').bind(todoInput.title, 0).run<Todo>();
    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    const todo = _.first(results);
    if (todo === undefined) {
        console.log('Error: todo is undefined');
        return new Response('Error', { status: 500 });
    }
    return new Response(TodoHTML(todo), { status: 201 });
}