export default function ImprintPage() {
  return (
    <div className="mx-auto py-8 max-w-4xl container">
      <h1 className="mb-8 font-bold text-3xl">Imprint</h1>

      <div className="max-w-none prose prose-gray">
        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">Business Information</h2>
          <p>
            CoverCraft AI is operated by:
            <br />
            Shreyans Jain
            <br />
            Dresdener Str. 35
            <br />
            10179, Berlin, Germany
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">Contact Information</h2>
          <p>
            Email:{" "}
            <a
              href="mailto:hello@covercraftai.com"
              className="text-secondary hover:underline"
            >
              hello@covercraftai.com
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">Online Presence</h2>
          <p>
            Website:{" "}
            <a
              href="https://covercraftai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              covercraftai.com
            </a>
            <br />
            GitHub:{" "}
            <a
              href="https://github.com/shreyansqt/covercraft-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              github.com/shreyansqt/covercraft-ai
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl">Legal Notice</h2>
          <p>
            This imprint complies with the requirements of § 5 TMG (German
            Telemedia Act). The operator of this website is responsible for its
            content within the meaning of § 55 Abs. 2 RStV (Interstate
            Broadcasting Treaty).
          </p>
        </section>
      </div>
    </div>
  );
}
