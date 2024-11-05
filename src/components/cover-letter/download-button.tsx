import type { CoverLetter } from "@/types";
import { DownloadIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export const DownloadButton = ({
  coverLetter,
}: {
  coverLetter: CoverLetter;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleGeneratePDF = async () => {
    setIsLoading(true);
    const response = await fetch("/api/pdf", {
      method: "POST",
      body: JSON.stringify({ content: coverLetter.content }),
    });
    // console.log(await response.json());
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and click it to download the file
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Revoke the object URL after download
    window.URL.revokeObjectURL(url);
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleGeneratePDF}
      className="ml-auto"
      disabled={isLoading}
      size="sm"
    >
      {isLoading ? (
        <Loader2 className="animate-spin size-4" />
      ) : (
        <DownloadIcon className="size-4" />
      )}
      {isLoading ? "Generating..." : "Download PDF"}
    </Button>
  );
};
