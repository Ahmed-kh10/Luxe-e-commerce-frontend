import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/api/products';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'daily', priority: 0.9 },
  ];

  try {
    const { data: products } = await getProducts({
      pageSize: 100,
      pageIndex: 1,
    });
    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${SITE_URL}/products/${product.id}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
    return [...staticRoutes, ...productRoutes];
  } catch {
    // If the backend is unreachable at build time, ship the static routes
    // rather than failing the whole sitemap generation.
    return staticRoutes;
  }
}
