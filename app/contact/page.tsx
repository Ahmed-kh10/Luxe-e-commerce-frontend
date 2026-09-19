import { Mail, MapPin, Phone } from 'lucide-react';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: 'support@luxe.example',
    href: 'mailto:support@luxe.example',
  },
  { icon: Phone, label: '+1 (555) 010-0100', href: 'tel:+15550100100' },
  { icon: MapPin, label: 'New York, NY', href: undefined },
];

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact Us">
      <p>
        Have a question about an order, a product, or anything else? We
        typically respond within one business day.
      </p>

      <ul className="mt-8 space-y-4">
        {CONTACT_METHODS.map((method) => {
          const Icon = method.icon;
          const content = (
            <span className="flex items-center gap-3 text-ink-900">
              <Icon className="h-4 w-4 text-gold-600" />
              {method.label}
            </span>
          );

          return (
            <li key={method.label}>
              {method.href ? (
                <a href={method.href} className="link-underline">
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </LegalPageLayout>
  );
}
