"use client";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";

export const StepCompanyInfo = ({ id }: { id: string }) => {
  const { coverLetter, updateCoverLetter } = useCoverLetter(id);
  useEffect(() => {
    updateCoverLetter({
      currentStep: "company-info",
    });
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCoverLetter({
      companyInfo: e.target.value,
    });
  };
  return (
    <div className="flex flex-col gap-2 h-full">
      <Label htmlFor="companyInfo">Company Information</Label>
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
