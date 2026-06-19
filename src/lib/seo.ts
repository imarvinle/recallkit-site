const SITE_URL = 'https://keepchatai.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function setSeo({ title, description, path, image = DEFAULT_IMAGE }: SeoInput) {
  if (typeof document === 'undefined') return;

  const canonicalUrl = `${SITE_URL}${path}`;
  document.title = title;

  setMeta('name', 'description', description);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:image', image);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', image);
  setCanonical(canonicalUrl);
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setCanonical(href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = 'canonical';
    document.head.appendChild(tag);
  }
  tag.href = href;
}
