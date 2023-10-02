import { html } from "./html";
import { z } from 'zod';

const Todo = z.object({
    id: z.string(),
    title: z.string(),
    completed: z.boolean(),
});

const TodoPut = z.object({
    title: z.string().nullable(),
    completed: z.boolean().nullable(),
});

const TodoPost = z.object({
    title: z.string(),
});

export type Todo = z.infer<typeof Todo>;
export type TodoPut = z.infer<typeof TodoPut>;
export type TodoPost = z.infer<typeof TodoPost>;

export function TodoHTML(item: Todo): string {
    return html`
    <md-list-item id="todo_item_${item.id}">
        <md-checkbox
            slot="start"
            touch-target="wrapper"
            name='${item.id}_${item.title.replace(' ', '_')}' 
            value=${item.completed}
            hx-trigger="change"
            hx-target="#todo_item_${item.id}"
            ${item.completed ? `hx-put="/api/todos/${item.id}/uncomplete"` : `hx-put="/api/todos/${item.id}/complete"`}
            ${item.completed ? 'checked' : ''}>${item.title}
        </md-checkbox>
        <div slot="headline">${item.title}</div>        
        <md-icon-button 
            slot="end"
            hx-target="#todo_item_${item.id}"
            hx-delete="/api/todos/${item.id}">
            <md-icon>delete</md-icon>
        </md-icon-button>
    </md-list-item>
    `
}