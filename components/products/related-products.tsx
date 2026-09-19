import { getProducts } from '@/lib/api/products';
import { ProductCard } from './product-card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

interface RelatedProductsProps {
  typeId?: number;
  excludeProductId: number;
}

export async function RelatedProducts({
  typeId,
  excludeProductId,
}: RelatedProductsProps) {
  if (!typeId) return null;

  let related;

  try {
    const result = await getProducts({
      typeId,
      pageSize: 5,
    });

    related = result.data
      .filter((product) => product.id !== excludeProductId)
      .slice(0, 4);
  } catch {
    // Related products are a bonus section.
    // A failure here should never break the product page.
    return null;
  }

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-ink-100 py-20">
      <Container>
        <SectionHeading eyebrow="Complete the Look" title="You May Also Like" />

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
