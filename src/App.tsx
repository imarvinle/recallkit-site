import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Privacy from './pages/Privacy';

/**
 * Tiny pathname router. We deliberately avoid pulling react-router for
 * a 2-page brochure site — `popstate` + `useState` is enough. Static
 * hosts (Cloudflare Pages / Vercel / Netlify) need a SPA fallback so
 * direct visits to `/privacy` still hit `index.html`; the `_redirects`
 * file in `public/` covers Cloudflare Pages and Netlify, while Vercel
 * picks it up from `vercel.json` automatically.
 */
export default function App() {
  const [path, setPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (path.toLowerCase().startsWith('/privacy')) return <Privacy />;
  return <Home />;
}
