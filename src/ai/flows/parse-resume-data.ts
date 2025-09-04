
'use server';

// Lightweight replacement for Genkit-backed AI flows.
// These implementations validate input and return a conservative default structure.
import { z } from 'zod';

const ParseResumeInputSchema = z.object({ resumeDataUri: z.string() });
export type ParseResumeInput = z.infer<typeof ParseResumeInputSchema>;

const ParseResumeOutputSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  summary: z.string().optional(),
  experience: z.array(z.object({ title: z.string().optional(), company: z.string().optional(), dates: z.string().optional(), description: z.string().optional() })).optional(),
  education: z.array(z.object({ institution: z.string().optional(), degree: z.string().optional(), dates: z.string().optional(), description: z.string().optional() })).optional(),
  skills: z.array(z.object({ category: z.string().optional(), skills: z.array(z.object({ name: z.string().optional() })).optional() })).optional(),
  links: z.array(z.object({ label: z.string().optional(), url: z.string().optional() })).optional(),
});
export type ParseResumeOutput = z.infer<typeof ParseResumeOutputSchema>;

export async function parseResume(input: ParseResumeInput): Promise<ParseResumeOutput> {
  // Minimal stub implementation: validate input and return empty/default parsed structure.
  ParseResumeInputSchema.parse(input);
  return {
    name: undefined,
    email: undefined,
    phone: undefined,
    summary: undefined,
    experience: [],
    education: [],
    skills: [],
    links: [],
  };
}
