import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="space-y-6">
        <h2 className="mb-4 font-bold text-2xl">Get Started</h2>
        <ol className="space-y-4 ml-4 list-decimal">
          <li className="text-muted-foreground">
            Go to Settings &gt; LLM and add your{" "}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI API Key
            </a>
          </li>
          <li className="text-muted-foreground">
            Go to Settings &gt; Resume and paste text from your resume
          </li>
          <li className="text-muted-foreground">
            Click &quot;New Cover Letter&quot; and get started!
          </li>
        </ol>
        <Separator />
        <div className="space-y-2 mt-12 text-muted-foreground text-sm">
          <p className="flex items-center gap-2">
            <span>🔒</span>
            <span>
              Private & Secure: All data is stored locally in your browser. No
              server involved.
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span>👀</span>
            <span>
              Open Source: View or contribute on{" "}
              <a
                href="https://github.com/shreyansqt/covercraft-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span>👋</span>
            <span>
              Built by{" "}
              <a
                href="https://shreyans.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Shreyans
              </a>{" "}
              for personal use & open source
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
