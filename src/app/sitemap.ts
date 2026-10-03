import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/about', '/projects', ...projects.map((p) => `/projects/${p.slug}`), '/batcomputer'];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : path === '/batcomputer' ? 0.3 : 0.7,
  }));
}
