"use client";

import { useToast } from "@/hooks/use-toast";
import { getCurrentStepPath } from "@/lib/steps";
import { cn } from "@/lib/utils";
import { createCoverLetter } from "@/services/cover-letter";
import { FilePlus, Spinner } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, type ButtonProps } from "./ui/button";

type Props = ButtonProps;

export const AddCoverLetterButton = ({
  className,
  disabled,
  ...restProps
}: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <Button
      onClick={handleButtonClick}
      className={cn(className)}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {isLoading ? <Spinner className="animate-spin" /> : <FilePlus />}
      New Cover Letter
    </Button>
  );
};
