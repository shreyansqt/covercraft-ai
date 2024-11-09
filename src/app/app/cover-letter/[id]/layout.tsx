import { CoverLetterFooter } from "@/components/wizard/footer";
import { CoverLetterHeader } from "@/components/wizard/header";
import { Timeline } from "@/components/wizard/timeline";

export default async function CoverLetterPage(props: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const params = await props.params;

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        <CoverLetterHeader id={params.id} />
        <Timeline id={params.id} />
        <main className="flex-grow flex-1 overflow-auto">{props.children}</main>
        <CoverLetterFooter id={params.id} />
      </div>
    </div>
  );
}
