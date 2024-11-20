"use client";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";

export const StepCompanyInfo = ({ id }: { id: string }) => {
  const { coverLetter, updateCoverLetter } = useCoverLetter(id);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCoverLetter({
      companyInfo: e.target.value,
    });
  };
  return (
    <div className="flex flex-col gap-2 p-6 h-full">
      <Label htmlFor="companyInfo">Enter Company Information</Label>
      <Textarea
        id="companyInfo"
        placeholder="Paste information from the company's about and careers page..."
        value={coverLetter.companyInfo}
        onChange={handleChange}
        className="flex-1 resize-none"
      />
    </div>
  );
};
