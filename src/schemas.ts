import { z } from "zod";

export const jobInfoSchema = z.object({
  roleName: z.string(),
  companyName: z.string(),
  matchScore: z.number(),
});

export const keywordSchema = z.object({
  name: z.string(),
  category: z.string(),
});
