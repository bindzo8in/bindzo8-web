import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/repositories/project';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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
    '/blog',
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

  let blogRoutes: MetadataRoute.Sitemap = [];
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true }
    });
    blogRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const categories = await prisma.blogCategory.findMany({
      select: { slug: true, updatedAt: true }
    });
    categoryRoutes = categories.map((cat) => ({
      url: `${SITE_URL}/blog?category=${cat.slug}`,
      lastModified: cat.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Failed to fetch blog items for sitemap', error);
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes, ...categoryRoutes];
}
