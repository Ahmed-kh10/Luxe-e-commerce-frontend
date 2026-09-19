import { Hero } from '@/components/home/hero';
import { Categories } from '@/components/home/categories';
import { FeaturedProducts } from '@/components/home/featured-products';
import { PromoBanner } from '@/components/home/promo-banner';
import { Newsletter } from '@/components/home/newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <Newsletter />
    </>
  );
}
