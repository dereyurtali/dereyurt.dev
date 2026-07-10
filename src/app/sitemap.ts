import type { MetadataRoute } from 'next';

const SITE = 'https://dereyurt.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1 },
    { path: '/airmed', priority: 0.9 },
    { path: '/parameter', priority: 0.8 },
    { path: '/cv', priority: 0.8 },
    { path: '/turksat-muy-2022', priority: 0.5 },
    { path: '/turksat-muy-2021', priority: 0.5 },
    { path: '/cansat-stabilization', priority: 0.5 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    lastModified: new Date('2026-07-10'),
    changeFrequency: 'monthly' as const,
    priority,
  }));
}
