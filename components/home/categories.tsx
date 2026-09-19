import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { getProductTypes } from '@/lib/api/products';
import type { ProductTypeDto } from '@/types/api';

export async function Categories() {
  let types: ProductTypeDto[] = [];
  try {
    types = await getProductTypes();
  } catch {
    types = [];
  }

  if (types.length === 0) return null;

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Browse"
          title="Shop by Category"
          description="Every category, curated with the same attention to detail."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {types.slice(0, 3).map((type) => (
            <Link
              key={type.id}
              href={`/products?typeId=${type.id}`}
              className="group relative flex aspect-[3/4] items-end overflow-hidden bg-obsidian-900"
            >
              {/* No real category photography yet — a deliberate gradient
                  tile instead of a broken/missing image. Swap this back
                  to an <img>/SmartImage per-category once real photos
                  exist in /public. */}
              <div className="absolute inset-0 bg-gradient-to-br from-obsidian-800 to-obsidian-950" />{' '}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(201,162,39,0.15),transparent_60%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/20 to-transparent" />{' '}
              <div className="absolute inset-3 border border-white/0 transition-colors duration-500 group-hover:border-white/30" />
              <div className="relative z-10 flex w-full items-center justify-between p-6">
                <span className="font-serif text-2xl text-white">
                  {type.name}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-ink-950">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
