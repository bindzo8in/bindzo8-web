import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/repositories/project';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bindzo8.com';

  const staticRoutes = [
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

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: projects } = await getProjects({ take: 1000, status: 'PUBLISHED' });
    projectRoutes = projects.map((project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: project.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Failed to fetch projects for sitemap', error);
  }

  return [...staticRoutes, ...projectRoutes];
}
