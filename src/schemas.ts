import { z } from "zod";

export const jobInfoSchema = z.object({
  roleName: z.string(),
  companyName: z.string(),
  matchScore: z.number(),
});

export const keywordSchema = z.object({
  name: z.string(),
  category: z.string(),
  selected: z.boolean().optional(),
});

export const chatMessageSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  content: z.string(),
  role: z.enum(["function", "user", "data", "assistant", "system", "tool"]),
});
