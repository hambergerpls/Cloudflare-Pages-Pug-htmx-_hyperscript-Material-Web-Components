import { Env } from "../worker-configuration";

export const header = { headers: { 'content-type': 'text/html;charset=UTF-8' } }

export const html = String.raw;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LayoutFunction<Params extends string = any> = ({
    children,
    request,
    params,
    env,
}: {
    children: string;
    request?: Request;
    params?: Params;
    env?: Env;
}) => string | Promise<string>;

export const applyLayout =
    (layout: LayoutFunction, isRoot: boolean): PagesFunction<Env> =>
        async ({ request, env, params, next }) => {
            const url = new URL(request.url);
            const method = request.method;
            if (
                url.pathname.match(/\.[^/]+$/) ||
                method !== 'GET' ||
                url.pathname.match(/_[^/]+$/) ||
                (isRoot && request.headers.get('HX-Boosted') === 'true')
            ) {
                return next();
            }

            const response = await next();
            const children = await response.text();
            if (response.ok) {
                return new Response(
                    await layout({ children, request, params, env }),
                    response
                );
            } else {
                return new Response('NOT FOUND', response);
            }
        };