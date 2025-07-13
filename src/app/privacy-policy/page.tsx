import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - LustTool',
  description: 'Privacy Policy for LustTool application',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-zinc-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-zinc-300 mb-4">
              When you use LustTool, we collect the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Your email address from Google OAuth</li>
              <li>Your name and profile picture from Google</li>
              <li>Information you provide when creating staff profiles</li>
              <li>Images and files you upload to the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-zinc-300 mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Provide authentication and account management</li>
              <li>Enable you to create and manage staff profiles</li>
              <li>Display your content on the platform</li>
              <li>Improve our services and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-zinc-300 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties. Your information is only shared:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>With your explicit consent</li>
              <li>When required by law</li>
              <li>To protect our rights and safety</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-zinc-300">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and transmitted over encrypted connections.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
            <p className="text-zinc-300">
              We retain your personal information only as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy. You can request deletion of your account and associated data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
            <p className="text-zinc-300">
              Our authentication system uses Google OAuth. Please review Google&apos;s Privacy Policy to understand how they handle your data during the authentication process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p className="text-zinc-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-zinc-300">
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
            <p className="text-zinc-300">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-zinc-300">
              If you have any questions about this privacy policy, please contact us through our support channels or by email.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <p className="text-zinc-400 text-center">
            This privacy policy is effective as of {new Date().toLocaleDateString()} and governs your use of LustTool.
          </p>
        </div>
      </div>
    </div>
  );
} 