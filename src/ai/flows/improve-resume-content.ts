
'use server';

/**
 * AI agent for improving resume content using Genkit.
 * Defines input/output schemas and the main improvement function for resume text.
 *
 * - improveResumeContent: Main function to improve resume content.
 * - ImproveResumeContentInput: Input type for resume improvement (expects resume text).
 * - ImproveResumeContentOutput: Output type with improved resume text.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for resume improvement (expects resume text string).
const ImproveResumeContentInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The content of the resume to be improved.'),
});
export type ImproveResumeContentInput = z.infer<typeof ImproveResumeContentInputSchema>;

// Output schema for improved resume content (string with suggestions).
const ImproveResumeContentOutputSchema = z.object({
  improvedContent: z
    .string()
    .describe('The improved content of the resume with suggestions.'),
});
export type ImproveResumeContentOutput = z.infer<typeof ImproveResumeContentOutputSchema>;

// Main function to improve resume content using the defined AI flow.
export async function improveResumeContent(input: ImproveResumeContentInput): Promise<ImproveResumeContentOutput> {
  return improveResumeContentFlow(input);
}

// Prompt definition for the AI model to improve resume content.
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
