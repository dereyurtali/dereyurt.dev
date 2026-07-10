import type { MetadataRoute } from 'next';

const SITE = 'https://ali.dereyurt.dev';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Documents and media belong to the projects, not to search results.
        disallow: ['/2021-muy-cdr/', '/2022-muy-cdr/', '/videos/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
