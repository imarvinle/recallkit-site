const LEGACY_HOSTS = new Set(['recallkit.org', 'www.recallkit.org']);
const CANONICAL_ORIGIN = 'https://keepchatai.com';

export function onRequest({ request, next }) {
  const url = new URL(request.url);

  if (LEGACY_HOSTS.has(url.hostname.toLowerCase())) {
    const destination = new URL(url.pathname + url.search, CANONICAL_ORIGIN);
    return Response.redirect(destination.toString(), 301);
  }

  return next();
}
