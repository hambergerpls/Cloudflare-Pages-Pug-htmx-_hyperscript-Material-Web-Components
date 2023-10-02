import { header, html } from "../../src/html";
import { Env } from "../../worker-configuration";

export const onRequestGet: PagesFunction<Env> = async () => {

    return new Response(html`
    <p>
        ${new Date(Date.now()).toTimeString()}
    </p>
    `, header);
}