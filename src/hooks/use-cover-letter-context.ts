import { useCoverLetter } from "./use-cover-letter";
import { useResume } from "./use-resume";

const getLabeledValue = (label: string, value: string | undefined) => {
  return value ? `${label}: ${value.replace(/\n/g, " ")}` : "";
};

export const useCoverLetterContext = (id: string): string => {
  const { resume } = useResume();
  const { coverLetter } = useCoverLetter(id);

  const context = `
    Applicant Resume: ${resume}
    ${getLabeledValue("Job Description", coverLetter?.jobDescription)}
    ${getLabeledValue("Company Name", coverLetter?.companyName)}
    ${getLabeledValue("Role Name", coverLetter?.roleName)}
    ${getLabeledValue("Company Info", coverLetter?.companyInfo)}
    ${getLabeledValue(
      "Selected Keywords",
      coverLetter?.keywords
        .filter((k) => k.selected)
        .map((k) => k.keyword)
        .join(", ")
    )}
    ${getLabeledValue("Cover Letter", coverLetter?.content)}
  `;

  return context.replace(/\n/g, " ").trim();
};
