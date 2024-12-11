import { useState } from "react";

export const useBlurAction = ({
  action,
  skipCondition,
}: {
  action: (value: string) => Promise<void>;
  skipCondition: (value: string) => boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBlur = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (skipCondition(e.target.value)) return;
    setIsLoading(true);
    await action(e.target.value);
    setIsLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  return { isLoading, success, handleBlur };
};
