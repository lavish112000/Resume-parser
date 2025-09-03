
// This server action handles resume file uploads and parsing.
// It reads the uploaded file, converts it to a Data URI, and invokes the AI-powered resume parser.
'use server';

import { parseResume } from '@/ai/flows/parse-resume-data';
import { z } from 'zod';

/**
 * Parses an uploaded resume file using AI.
 * @param formData - FormData containing the uploaded resume file.
 * @returns Parsed resume data or error message.
 */
export async function parseResumeAction(formData: FormData) {
  // Get the uploaded file from the form data.
  const file = formData.get('resume');
  if (!file || !(file instanceof File)) {
    return { error: 'No file uploaded.' };
  }

  // Read file as Data URI for AI parsing.
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const mimeType = file.type || 'application/pdf';
  const resumeDataUri = `data:${mimeType};base64,${base64}`;

  // Parse resume using the AI flow.
  try {
    const data = await parseResume({ resumeDataUri });
    return { data };
  } catch (error) {
    return { error: 'Failed to parse resume.' };
  }
}
