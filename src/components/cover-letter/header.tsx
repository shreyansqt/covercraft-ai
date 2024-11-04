import { useCoverLetter } from "@/hooks/use-cover-letter";

export const CoverLetterHeader = ({ id }: { id: string }) => {
  const { coverLetter } = useCoverLetter(id);

  return (
    <header className="flex flex-col px-6 py-4 border-b">
      <h1 className="font-bold text-2xl">
        {coverLetter.roleName || "Unknown role"}
      </h1>
      <h2 className="text-muted-foreground text-sm">
        {coverLetter.companyName || "Unknown company"}
      </h2>
    </header>
  );
};
