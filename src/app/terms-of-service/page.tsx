import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Terms of Service | VIP Transformative Living",
  description: "Terms of Service for VIP Transformative Living.",
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-20 font-sans">
      <Section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground">Last Updated: January 22, 2026</p>

          <div className="prose prose-invert prose-gold max-w-none space-y-6 text-muted-foreground">
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the 
              VIP Transformative Living website (the "Service") operated by VIP Transformative Living ("us", "we", or "our").
            </p>
            <p>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. 
              These Terms apply to all visitors, users and others who access or use the Service.
            </p>
            <p>
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms 
              then you may not access the Service.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Coaching Services</h2>
            <p>
              The services provided by VIP Transformative Living are for educational and self-improvement purposes only. 
              They do not constitute medical or psychological advice, diagnosis, or treatment. 
              Participation in coaching is not a substitute for professional mental health care or medical care.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Purchases</h2>
            <p>
              If you wish to purchase any product or service made available through the Service ("Purchase"), 
              you may be asked to supply certain information relevant to your Purchase including, without limitation, 
              your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
            </p>
            <p>
              You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) 
              in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, 
              text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post 
              to the Service, including its legality, reliability, and appropriateness.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features and functionality are and 
              will remain the exclusive property of VIP Transformative Living and its licensors. The Service is protected by copyright, 
              trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used 
              in connection with any product or service without the prior written consent of VIP Transformative Living.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Links To Other Web Sites</h2>
            <p>
              Our Service may contain links to third-party web sites or services that are not owned or controlled by VIP Transformative Living.
            </p>
            <p>
              VIP Transformative Living has no control over, and assumes no responsibility for, the content, privacy policies, 
              or practices of any third party web sites or services. You further acknowledge and agree that VIP Transformative Living 
              shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by 
              or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Termination</h2>
            <p>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, 
              including without limitation if you breach the Terms.
            </p>
            <p>
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, 
              without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Florida, United States, without regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
              If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of 
              these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, 
              and supersede and replace any prior agreements we might have between us regarding the Service.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material 
              we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change 
              will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. 
              If you do not agree to the new terms, please stop using the Service.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at: 
              <a href="mailto:waynedawson@viptransformativeliving.com" className="text-gold hover:underline ml-1">waynedawson@viptransformativeliving.com</a>.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
