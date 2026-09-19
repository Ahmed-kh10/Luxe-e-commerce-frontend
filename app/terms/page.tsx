import { LegalPageLayout } from '@/components/legal/legal-page-layout';

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="September 2026">
      <p>
        By using this site, you agree to purchase products for personal use and
        to provide accurate information during checkout.
      </p>
      <p>
        All prices are listed in USD and are subject to change without notice.
        Orders are confirmed only once payment has been processed successfully.
      </p>
      <p>
        We reserve the right to refuse service to anyone for any reason at any
        time.
      </p>
    </LegalPageLayout>
  );
}
