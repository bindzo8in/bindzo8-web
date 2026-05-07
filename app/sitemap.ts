import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bindzo8.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/services/digital-marketing',
    '/services/graphic-design',
    '/services/mobile-app',
    '/services/seo',
    '/services/video-editing',
    '/services/website-development',
    '/contact',
    '/career',
    '/products',
    '/who-we-are',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
