export default function PrivacyPage() {
  return (
    <div className="mx-auto py-8 max-w-4xl container">
      <h1 className="mb-8 font-bold text-3xl">Privacy Policy</h1>

      <div className="max-w-none prose prose-gray">
        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">1. Data Collection</h2>
          <p>CoverCraft AI collects the following information:</p>
          <ul className="mt-2 pl-6 list-disc">
            <li>
              Authentication data (name, email, profile picture) through Google
              login
            </li>
            <li>Resume content and job application details you provide</li>
            <li>Cover letters generated using our service</li>
            <li>Chat conversations with our AI assistant</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">2. Data Usage</h2>
          <p>We use your data to:</p>
          <ul className="mt-2 pl-6 list-disc">
            <li>Generate personalized cover letters</li>
            <li>Provide AI-powered chat assistance</li>
            <li>Improve our service and AI models</li>
            <li>Ensure proper functioning of the application</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">3. Data Sharing</h2>
          <p>We share data with the following third-party services:</p>
          <ul className="mt-2 pl-6 list-disc">
            <li>Supabase - For database and authentication services</li>
            <li>OpenAI - For AI-powered content generation</li>
            <li>Google - For authentication purposes</li>
            <li>Vercel - For hosting and analytics</li>
          </ul>
          <p className="mt-4">
            We do not sell your personal data to third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">4. User Rights</h2>
          <p>You have the right to:</p>
          <ul className="mt-2 pl-6 list-disc">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data in a portable format</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">
            5. Cookies and Tracking
          </h2>
          <p>
            We use essential cookies for authentication and session management.
            Vercel Analytics is used to collect anonymous usage data to improve
            our service. You can control cookie preferences through your browser
            settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">6. Data Security</h2>
          <p>We implement industry-standard security measures including:</p>
          <ul className="mt-2 pl-6 list-disc">
            <li>Encrypted data transmission (SSL/TLS)</li>
            <li>Secure database hosting with Supabase</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">7. Data Retention</h2>
          <p>
            We retain your data for as long as you maintain an active account.
            Upon account deletion, your personal data and generated content will
            be permanently removed within 30 days. Some anonymous usage data may
            be retained for analytical purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">8. Updates to Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify users
            of significant changes through email or in-app notifications.
            Continued use of the service after changes constitutes acceptance of
            the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">
            9. Contact Information
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please email us
            at{" "}
            <a
              href="mailto:hello@covercraftai.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              hello@covercraftai.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
