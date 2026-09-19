interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          {eyebrow}
        </p>
      )}
      <h2
        className={
          'heading-accent mt-3 text-3xl text-ink-900 sm:text-4xl' +
          (align === 'center'
            ? ' mx-auto before:left-1/2 before:-translate-x-1/2'
            : '')
        }
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-5 max-w-xl text-ink-600"
          style={align === 'center' ? { marginInline: 'auto' } : undefined}
        >
          {description}
        </p>
      )}
    </div>
  );
}
