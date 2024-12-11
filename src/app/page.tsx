import { auth } from "@/auth";
import { Logo } from "@/components/logo";
import { SignIn } from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChatTeardropDots,
  EyeClosed,
  FilePdf,
  GearSix,
  GithubLogo,
  MagicWand,
  PaintBrush,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const features = [
  {
    icon: PaintBrush,
    title: "Custom Cover Letter Generation",
    description:
      "Harness the power of LLMs to generate cover letters tailored to the job requirements, your resume, and company values.",
  },
  {
    icon: MagicWand,
    title: "Smart Keyword Matching",
    description:
      "See a list of relevant keywords with match scores. Manually select the ones you want to emphasize in your cover letter.",
  },
  {
    icon: FilePdf,
    title: "Instant Editing & PDF Export",
    description:
      "Make edits directly after generation, and download a polished PDF in one click.",
  },
  {
    icon: ChatTeardropDots,
    title: "Answer Additional Questions",
    description:
      "Is there a tricky question on the application? Use the built-in chat to get LLM-generated answers on the spot.",
  },
  {
    icon: GearSix,
    title: "Fully Customizable Prompts",
    description:
      "Adjust prompts as you like for total control over the content and tone of your cover letter.",
  },
  {
    icon: EyeClosed,
    title: "Private & Secure",
    description:
      "All data is stored locally in your browser. Code is open source and available on GitHub.",
  },
];

export default async function LandingPage() {
  const session = await auth();
  return (
    <>
      <header className="top-0 z-10 sticky bg-background border-b">
        <div className="flex justify-between items-center mx-auto py-4 container">
          <div className="flex items-center gap-8 align-baseline">
            <Logo href="/" />
          </div>
          <div className="flex items-center gap-8">
            <a
              href="https://github.com/shreyansqt/covercraft-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-secondary"
            >
              <GithubLogo className="size-6" weight="duotone" />
              <span>GitHub</span>
            </a>
            {session ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/app">Go to app</Link>
                </Button>
              </>
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-col mx-auto container">
        {/* Hero Section */}
        <div className="flex flex-col gap-6 mx-auto py-24 max-w-3xl text-center">
          <h1 className="font-semibold text-4xl md:text-5xl leading-tight">
            Craft the Perfect Cover Letter, Completely Free.
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
            Generate, customize, and download your cover letter in minutes—all
            securely in your browser, no cost involved.
          </p>
          {session ? (
            <Button size="lg" className="shadow-none mx-auto" asChild>
              <Link href="/app">Create Your First Cover Letter</Link>
            </Button>
          ) : (
            <SignIn size="lg" className="shadow-none mx-auto">
              Create Your First Cover Letter
            </SignIn>
          )}
        </div>

        {/* Features Grid */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shadow-none p-6 border-none rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <feature.icon
                  className="w-6 h-6 text-secondary"
                  weight="duotone"
                />
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
