import { Progress } from "@/components/ui/progress";
import { CoverLetterFooter } from "@/components/wizard/footer";
import { CoverLetterHeader } from "@/components/wizard/header";
import { Timeline } from "@/components/wizard/timeline";
import {
  getCurrentStepIndex,
  getStepComponent,
  steps,
  type Step,
} from "@/lib/steps";
import { getCoverLetter } from "@/services/cover-letter";
import { notFound } from "next/navigation";

export default async function CoverLetterStepPage(props: {
  params: Promise<{ id: string; step: string }>;
}) {
  const params = await props.params;
  const coverLetter = await getCoverLetter(params.id);

  if (!coverLetter) return notFound();

  const CurrentStepComponent = getStepComponent(params.step as Step);

  const currentStepIndex = getCurrentStepIndex(coverLetter);

  if (!CurrentStepComponent) return null;

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        <CoverLetterHeader coverLetter={coverLetter} />
        <Timeline coverLetter={coverLetter} activeStep={params.step as Step} />
        <Progress
          value={((currentStepIndex + 1) / steps.length) * 100}
          className="rounded-none h-[2px]"
        />
        <main className="flex-grow flex-1 overflow-auto">
          <CurrentStepComponent coverLetter={coverLetter} />
        </main>
        <CoverLetterFooter
          coverLetter={coverLetter}
          activeStep={params.step as Step}
        />
      </div>
    </div>
  );
}
