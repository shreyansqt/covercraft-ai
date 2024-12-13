"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { updateResume } from "@/services/resume";
import type { Resume } from "@prisma/client";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const ResumeForm = ({
  currentResume,
  className,
}: {
  currentResume: Resume | null;
  className?: string;
}) => {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(updateResume, null);

  useEffect(() => {
    if (state && hasSubmitted) {
      toast({
        title: state?.error ? "Error" : "Success",
        description: state?.error?.message || state?.message,
        variant: state?.error ? "destructive" : "default",
      });
      setHasSubmitted(false);
      router.refresh();
    }
  }, [state, toast, hasSubmitted, router]);
  return (
    <Form
      action={formAction}
      onSubmit={() => {
        setHasSubmitted(true);
      }}
      className={cn("flex flex-col gap-4", className)}
    >
      <Label htmlFor="content">Resume content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={currentResume?.content}
        className="flex-1"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </Form>
  );
};
