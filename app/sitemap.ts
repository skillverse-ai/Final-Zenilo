import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zenlio.io';

  // Base routes
  const baseRoutes = ['', '/blog', '/contact', '/privacy', '/cookies', '/data-rights'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' || route === '/blog') ? 'daily' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : route === '/blog' ? 0.8 : 0.5,
  }));

  // Dynamic blog post routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...baseRoutes, ...blogRoutes];
}
