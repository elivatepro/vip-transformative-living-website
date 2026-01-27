import LegalContent from '@/components/legal/LegalContent';
import { termsContent } from '@/content/terms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | VIP Transformative Living',
  description: 'Review the terms and conditions for using VIP Transformative Living services.',
};

export default function TermsPage() {
  return (
    <LegalContent
      label="Legal"
      title="Terms & Conditions"
      lastUpdated="January 27, 2026"
      content={termsContent}
    />
  );
}
