import LegalContent from '@/components/legal/LegalContent';
import { privacyContent } from '@/content/privacy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | VIP Transformative Living',
  description: 'Learn how VIP Transformative Living collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <LegalContent
      label="Legal"
      title="Privacy Policy"
      lastUpdated="January 27, 2026"
      content={privacyContent}
    />
  );
}
