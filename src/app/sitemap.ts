import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { pages } from '@/lib/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${SITE_URL}${page.href === '/' ? '' : page.href}`,
    changeFrequency: 'monthly',
    priority: page.href === '/' ? 1 : 0.7,
  }));
}
