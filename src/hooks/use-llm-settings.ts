import type { LLMSettings } from "@/types";
import { useLocalStorage } from "usehooks-ts";

const defaultJobSummaryPrompt = `Provide structured data based on the following job description and company info. Respond in JSON format:
roleName: (job title/role name)
companyName: (company name)
keywords: (list of keywords, each between 1-3 words with following categories)
- Company Values
- Key Responsibilities
- Technical Requirements
- Leadership Skills
- Soft Skills`;

const defaultCoverLetterPrompt = `Based on the provided job description, company info, resume and selected keywords, generate a cover letter in the following format:

[Candidate Name]
[Candidate City], [Candidate Country]
[Candidate Email]
[Candidate Phone]

[Date]

Hi [Hiring Manager Name | 'there'],
I am excited to apply for the [Role Name] role at [Company Name]. With over ten years of experience in [job responsibilities] and [key requirement], I believe my expertise & motivations align really well with the visions of [team name]. 

Here are three key reasons why I would be an excellent fit:
<ol>
<li>[1-2 sentences showing technical skills match]</li>
<li>[1-2 sentences showing leadership and/or soft skills match]</li>
<li>[1-2 sentences showing culture fit]</li>
</ol>
I am looking forward to contributing my skills in taking [team / company name] to the next level. 

Best regards,
[Candidate Name]

---

Things to keep in mind:
- Make sure to return the cover letter in html tags such as <p>, <ul>, <ol>, <li> & <em>. Don't use any other html tags.
- Don't prepend the response with \`\`\`html or append with \`\`\`
- Use selected keywords when possible as they were selected by the candidate
- The tone of the cover letter should be professional, friendly and upbeat.
- Make sure to mention candidate's past experiences from the resume.
- Make sure to insert today's date in place of [Date]`;

const defaultProcessJobDescriptionPrompt = `Based on the above context, provide structured data in JSON format`;

const defaultLLMSettings: LLMSettings = {
  jobSummaryPrompt: defaultJobSummaryPrompt,
  coverLetterPrompt: defaultCoverLetterPrompt,
  processJobDescriptionPrompt: defaultProcessJobDescriptionPrompt,
};

export const useLLMSettings = () => {
  const [llmSettings, setLLMSettings, removeLLMSettings] =
    useLocalStorage<LLMSettings>("llmSettings", defaultLLMSettings);
  return { llmSettings, setLLMSettings, removeLLMSettings };
};
