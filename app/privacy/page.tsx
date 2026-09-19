import { LegalPageLayout } from '@/components/legal/legal-page-layout';

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="September 2026">
      <p>
        We collect only the information needed to process your orders and
        improve your experience — your name, shipping address, and order
        history. We never sell your data to third parties.
      </p>
      <p>
        Payment details are handled entirely by Stripe; we never store your card
        information on our servers.
      </p>
      <p>
        You can request a copy of your data, or ask us to delete your account,
        at any time by contacting our support team.
      </p>
    </LegalPageLayout>
  );
}
