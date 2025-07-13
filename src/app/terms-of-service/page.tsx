import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - LustTool',
  description: 'Terms of Service for LustTool application',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-zinc-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-zinc-300">
              By accessing and using LustTool, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-zinc-300">
              LustTool is a platform that allows users to create and manage staff profiles, upload images and 3D models, 
              and display team information. The service is provided "as is" without warranty of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-zinc-300 mb-4">
              To use certain features of the service, you must:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Create an account using Google OAuth</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Be responsible for all activity under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
            <p className="text-zinc-300 mb-4">
              You are solely responsible for the content you upload. By uploading content, you represent that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>You own or have the right to use the content</li>
              <li>The content does not violate any laws or rights of others</li>
              <li>The content is not harmful, offensive, or inappropriate</li>
              <li>You grant us the right to display and distribute your content through the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Prohibited Uses</h2>
            <p className="text-zinc-300 mb-4">
              You agree not to use the service:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>For any unlawful purpose or to solicit unlawful activity</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To transmit or procure the sending of any advertising or promotional material</li>
              <li>To impersonate or attempt to impersonate another user</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-zinc-300">
              The service and its original content, features, and functionality are and will remain the exclusive property of LustTool and its licensors. 
              The service is protected by copyright, trademark, and other laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Privacy Policy</h2>
            <p className="text-zinc-300">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
              to understand our practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
            <p className="text-zinc-300">
              We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, 
              under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Disclaimer</h2>
            <p className="text-zinc-300">
              The information on this service is provided on an "as is" basis. To the fullest extent permitted by law, 
              LustTool excludes all representations, warranties, conditions, and all other terms which might otherwise have effect 
              by statute or common law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
            <p className="text-zinc-300">
              In no event shall LustTool be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
            <p className="text-zinc-300">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the service operates, 
              without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
            <p className="text-zinc-300">
              We reserve the right to update these terms at any time. We will notify users of any material changes by posting the new terms on this page. 
              Your continued use of the service after any such changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
            <p className="text-zinc-300">
              If you have any questions about these terms, please contact us through our support channels.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <p className="text-zinc-400 text-center">
            By using LustTool, you acknowledge that you have read and understood these terms of service.
          </p>
        </div>
      </div>
    </div>
  );
} 