import type { MetadataRoute } from 'next';

const SITE = 'https://ali.dereyurt.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1 },
    { path: '/research', priority: 0.9 },
    { path: '/airmed', priority: 0.8 },
    { path: '/parameter', priority: 0.8 },
    { path: '/cv', priority: 0.8 },
    { path: '/turksat-muy-2022', priority: 0.7 },
    { path: '/turksat-muy-2021', priority: 0.6 },
    { path: '/cansat-stabilization', priority: 0.6 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    lastModified: new Date('2026-08-22'),
    changeFrequency: 'monthly' as const,
    priority,
  }));
}
