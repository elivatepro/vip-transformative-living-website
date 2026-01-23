import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Privacy Policy | VIP Transformative Living",
  description: "Privacy Policy for VIP Transformative Living. How we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 font-sans">
      <Section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: January 22, 2026</p>

          <div className="prose prose-invert prose-gold max-w-none space-y-6 text-muted-foreground">
            <p>
              VIP Transformative Living ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
              <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To register you as a new client.</li>
              <li>To process and deliver your order including: Manage payments, fees and charges; Collect and recover money owed to us.</li>
              <li>To manage our relationship with you which will include: Notifying you about changes to our terms or privacy policy; Asking you to leave a review or take a survey.</li>
              <li>To enable you to partake in a prize draw, competition or complete a survey.</li>
              <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data).</li>
              <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
              <li>To use data analytics to improve our website, products/services, marketing, customer relationships and experiences.</li>
              <li>To make suggestions and recommendations to you about goods or services that may be of interest to you.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Third-Party Links</h2>
            <p>
              This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at: 
              <a href="mailto:waynedawson@viptransformativeliving.com" className="text-gold hover:underline ml-1">waynedawson@viptransformativeliving.com</a>.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
