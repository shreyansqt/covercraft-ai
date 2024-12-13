import { AddCoverLetterButton } from "@/components/add-cover-letter-button";
import { ResumeForm } from "@/components/resume-form";
import { SidebarButton } from "@/components/sidebar-button";
import { getResume } from "@/services/resume";
import { getCurrentUser } from "@/services/user";

export default async function LandingPage() {
  const user = await getCurrentUser();
  if (!user) return <div>Not authenticated</div>;
  const resume = await getResume();
  return (
    <div className="relative h-screen">
      <SidebarButton />
      <div className="flex flex-col gap-4 mx-auto px-8 pt-16 pb-8 max-w-[800px] h-full">
        <h1 className="font-semibold text-3xl">Welcome {user.name}!</h1>
        {resume?.content ? (
          <>
            <p className="text-muted-foreground">
              Great! You have successfully added your resume.
              <br />
              Now you can create a new cover letter by clicking the button below
            </p>
            <AddCoverLetterButton size="lg" />
          </>
        ) : (
          <>
            <p className="text-muted-foreground">
              Let&apos;s get started by providing your resume
            </p>
            <ResumeForm currentResume={resume} className="flex-1" />
          </>
        )}
      </div>
    </div>
  );
}
