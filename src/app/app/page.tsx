import { auth } from "@/auth";
import { SidebarButton } from "@/components/sidebar-button";

export default async function LandingPage() {
  const session = await auth();
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen">
      <SidebarButton />
      <div className="space-y-16 px-4 py-16 max-w-3xl">
        <div className="space-y-6">
          <h1 className="mb-4 font-semibold text-3xl">
            Welcome {session?.user?.name}!
          </h1>
          <h2 className="mb-4 font-semibold text-2xl">Get Started</h2>
          <ol className="space-y-4 ml-4 list-decimal">
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
