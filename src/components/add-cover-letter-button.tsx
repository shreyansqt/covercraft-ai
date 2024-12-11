"use client";

import { useToast } from "@/hooks/use-toast";
import { getCurrentStepPath } from "@/lib/steps";
import { createCoverLetter } from "@/services/cover-letter";
import { FilePlus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

export const AddCoverLetterButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleButtonClick = async () => {
    setIsLoading(true);
    const coverLetter = await createCoverLetter();
    router.push(getCurrentStepPath(coverLetter));
    toast({
      title: "Cover letter created",
      description: "You can start by entering the job description",
    });
    setIsLoading(false);
  };
  return (
    <Button onClick={handleButtonClick} className="w-full" disabled={isLoading}>
      <FilePlus className="mr-2 w-4 h-4" weight="duotone" /> New Cover Letter
    </Button>
  );
};
