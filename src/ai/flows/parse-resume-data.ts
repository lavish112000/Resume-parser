'use server';

/**
 * @fileOverview An AI agent for parsing resume data from various file formats.
 *
 * - parseResume - A function that handles the resume parsing process.
 * - ParseResumeInput - The input type for the parseResume function, accepting resume data as a data URI.
 * - ParseResumeOutput - The return type for the parseResume function, providing structured resume data.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      'The resume file data, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Explicitly using single quotes to avoid confusion
    ),
});
export type ParseResumeInput = z.infer<typeof ParseResumeInputSchema>;

const ParseResumeOutputSchema = z.object({
  name: z.string().describe('The name of the resume owner.'),
  email: z.string().email().describe('The email address of the resume owner.'),
  phone: z.string().describe('The phone number of the resume owner.'),
  summary: z.string().describe('A brief summary or objective statement from the resume.'),
  experience: z
    .array(
      z.object({
        title: z.string().describe('The job title.'),
        company: z.string().describe('The company name.'),
        dates: z.string().describe('The employment dates.'),
        description: z.string().describe('A description of the job responsibilities.'),
      })
    )
    .describe('A list of work experience entries.'),
  education:
    z
      .array(
        z.object({
          institution: z.string().describe('The name of the educational institution.'),
          degree: z.string().describe('The degree obtained.'),
          dates: z.string().describe('The graduation dates.'),
          description: z.string().describe('Additional details about education.'),
        })
      )
      .describe('A list of education entries')
      .optional(),
  skills: z.array(z.string()).describe('A list of skills.'),
});
export type ParseResumeOutput = z.infer<typeof ParseResumeOutputSchema>;

export async function parseResume(input: ParseResumeInput): Promise<ParseResumeOutput> {
  return parseResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseResumePrompt',
  input: {schema: ParseResumeInputSchema},
  output: {schema: ParseResumeOutputSchema},
  prompt: `You are an expert resume parser, skilled at extracting information from resumes.

  Analyze the provided resume data and extract the following information:
  - Name
  - Email
  - Phone
  - Summary
  - Experience (job title, company, dates, description)
  - Education (institution, degree, dates, description)
  - Skills

  Resume Data: {{media url=resumeDataUri}}

  Ensure that the extracted data is accurate and well-formatted.
  Return the data in JSON format.
  `,
});

const parseResumeFlow = ai.defineFlow(
  {
    name: 'parseResumeFlow',
    inputSchema: ParseResumeInputSchema,
    outputSchema: ParseResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
