import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    const withoutSlash = url.pathname.slice(0, -1);
    const redirectTo = `${withoutSlash}${url.search}`;
    return context.redirect(redirectTo, 301);
  }
  return next();
};
