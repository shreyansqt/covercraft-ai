import { auth } from "@/auth";
import { GithubLogo, Link } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./logo";
import { SignIn } from "./sign-in";
import { Button } from "./ui/button";

export const SiteHeader = async () => {
  const session = await auth();
  return (
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
  );
};
