import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

const VALUES = [
  {
    title: 'Craftsmanship',
    description:
      "Every piece is chosen for how it's made, not just how it looks — materials and construction that last.",
  },
  {
    title: 'Restraint',
    description:
      "We'd rather offer fewer, better things than overwhelm you with noise and trends.",
  },
  {
    title: 'Transparency',
    description:
      'Real prices, real availability, real information — no dark patterns, ever.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-950 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.12),transparent_55%)]" />

        <Container className="relative text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            Our Story
          </p>
          <h1 className="mx-auto mt-6 max-w-2xl font-serif text-4xl leading-tight text-white sm:text-5xl">
            Built on the belief that quality speaks quietly
          </h1>
        </Container>
      </section>

      {/* Story body */}
      <section className="py-24">
        <Container className="mx-auto max-w-2xl">
          <p className="text-lg leading-relaxed text-ink-700">
            Luxe started as a simple question: why does buying something
            well-made have to feel complicated? We set out to build a place
            where the products, the experience, and the details all meet the
            same standard — one that respects your time and your taste.
          </p>
          <p className="mt-6 leading-relaxed text-ink-600">
            Every product in our collection is selected with the same question
            in mind: would we be proud to have this in our own home, our own
            wardrobe? If the answer isn&apos;t an easy yes, it doesn&apos;t make
            the cut.
          </p>
        </Container>
      </section>

      {/* Values */}
      <section className="border-t border-ink-100 py-24">
        <Container>
          <SectionHeading
            eyebrow="What Guides Us"
            title="Our Values"
            align="center"
          />

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3">
            {VALUES.map((value, index) => (
              <div key={value.title} className="relative text-center">
                {/* Large faint numeral as a quiet decorative accent */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none font-serif text-6xl text-ink-100"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="relative font-serif text-xl text-ink-900">
                  {value.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-ink-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
