import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Changelog from './pages/Changelog';
import Library from './pages/Library';
import Reader from './pages/Reader';
import Degraded from './pages/Degraded';

/**
 * Tiny pathname router. We deliberately avoid pulling react-router for
 * a few-page brochure / archive site — `popstate` + `useState` is
 * enough. Static hosts (Cloudflare Pages / Vercel / Netlify) need a
 * SPA fallback so direct visits to `/privacy`, `/library`, `/c/<id>`
 * still hit `index.html`; the `_redirects` file in `public/` covers
 * Cloudflare Pages and Netlify, while Vercel picks it up from
 * `vercel.json` automatically.
 */
export default function App() {
  const [path, setPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const lower = path.toLowerCase();
  if (lower.startsWith('/privacy')) return <Privacy />;
  if (lower.startsWith('/changelog')) return <Changelog />;
  if (lower.startsWith('/library')) return <Library />;
  if (lower.startsWith('/degraded')) return <Degraded />;
  const convMatch = path.match(/^\/c\/([^/?#]+)/);
  if (convMatch) return <Reader id={decodeURIComponent(convMatch[1])} />;
  return <Home />;
}
