export default function TermsPage() {
  return (
    <div className="mx-auto py-8 max-w-4xl container">
      <h1 className="mb-8 font-bold text-3xl">Terms of Service</h1>

      <div className="max-w-none prose prose-gray">
        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using CoverCraft AI (&quot;the Service&quot;), you
            agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">2. Eligibility</h2>
          <p>
            You must be at least 18 years old and capable of forming a binding
            contract to use the Service. By using the Service, you represent
            that you meet these requirements and will comply with all applicable
            laws and regulations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">3. User Accounts</h2>
          <p>
            The Service uses Google authentication for user accounts. You are
            responsible for maintaining the confidentiality of your account and
            all activities that occur under it. You agree to notify us
            immediately of any unauthorized use of your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">4. Usage Restrictions</h2>
          <p>You agree not to:</p>
          <ul className="mt-2 pl-6 list-disc">
            <li>Use the Service for any illegal purposes</li>
            <li>
              Attempt to reverse engineer or decompile any part of the Service
            </li>
            <li>Use the Service to generate harmful or malicious content</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Circumvent any access controls or usage limitations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">5. Content Ownership</h2>
          <p>
            You retain ownership of any content you upload or generate using the
            Service. By using the Service, you grant us a non-exclusive license
            to store and process your content solely for the purpose of
            providing the Service. We retain all rights to the Service&apos;s
            code, features, and infrastructure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">
            6. Modification of Service
          </h2>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of
            the Service at any time without notice. We may also update these
            Terms of Service at our discretion. Continued use of the Service
            after such changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">
            7. Liability Disclaimer
          </h2>
          <p>
            The Service is provided &quot;as is&quot; without warranties of any
            kind. We are not liable for any damages, including but not limited
            to data loss, service interruptions, or errors in generated content.
            You use the Service at your own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">
            8. Termination of Service
          </h2>
          <p>
            We may suspend or terminate your access to the Service at our sole
            discretion, particularly for violations of these terms. You may also
            terminate your use of the Service at any time by discontinuing its
            use and deleting your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">9. Contact</h2>
          <p>
            If you have any questions about these Terms of Service, please email
            us at{" "}
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
