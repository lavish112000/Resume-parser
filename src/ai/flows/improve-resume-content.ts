'use server';

/**
 * @fileOverview An AI agent for improving resume content.
 *
 * - improveResumeContent - A function that handles the resume content improvement process.
 * - ImproveResumeContentInput - The input type for the improveResumeContent function.
 * - ImproveResumeContentOutput - The return type for the improveResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveResumeContentInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The content of the resume to be improved.'),
});
export type ImproveResumeContentInput = z.infer<typeof ImproveResumeContentInputSchema>;

const ImproveResumeContentOutputSchema = z.object({
  improvedContent: z
    .string()
    .describe('The improved content of the resume with suggestions.'),
});
export type ImproveResumeContentOutput = z.infer<typeof ImproveResumeContentOutputSchema>;

export async function improveResumeContent(input: ImproveResumeContentInput): Promise<ImproveResumeContentOutput> {
  return improveResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveResumeContentPrompt',
  input: {schema: ImproveResumeContentInputSchema},
  output: {schema: ImproveResumeContentOutputSchema},
  prompt: `You are an AI assistant designed to improve resume content.

  Provide suggestions to improve the resume content, such as suggesting action verbs, quantifying achievements, and checking for grammar and conciseness.

  Resume Content: {{{resumeContent}}}`,
});

const improveResumeContentFlow = ai.defineFlow(
  {
    name: 'improveResumeContentFlow',
    inputSchema: ImproveResumeContentInputSchema,
    outputSchema: ImproveResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
