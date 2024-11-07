"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export default function LandingPage() {
  const { isMobile, open } = useSidebar();
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen">
      {(!open || isMobile) && (
        <SidebarTrigger className="top-4 left-4 absolute" />
      )}
      <div className="space-y-16 px-4 py-16 max-w-3xl">
        <div className="space-y-6">
          <h2 className="mb-4 font-semibold text-2xl">Get Started</h2>
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
        </div>
      </div>
    </div>
  );
}
