import type { TypedCoverLetter } from "@/types";

const getLabeledValue = (label: string, value: string | null | undefined) => {
  return value ? `${label}: ${value}` : "";
};

export const addContextToPrompt = (
  prompt: string,
  coverLetter: TypedCoverLetter,
  resume: string
): string => {
  const result = `Applicant Resume: ${resume}
    ${getLabeledValue("Job Description", coverLetter.jobDescription)}
    ${getLabeledValue("Company Name", coverLetter?.jobInfo?.companyName)}
    ${getLabeledValue("Role Name", coverLetter?.jobInfo?.roleName)}
    ${getLabeledValue(
      "Match Score",
      coverLetter?.jobInfo?.matchScore?.toString()
    )}
    ${getLabeledValue("Company Info", coverLetter?.companyInfo)}
    ${getLabeledValue(
      "Selected Keywords",
      coverLetter?.keywords
        ?.filter((k) => k.selected)
        .map((k) => k.name)
        .join(", ")
    )}
    ${getLabeledValue("Cover Letter", coverLetter?.content)}
    Today's date: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
    ---
    ${prompt}
  `;

  return result.replace(/\n/g, " ").trim();
};
