'use server';

import { parseResume } from '@/ai/flows/parse-resume-data';
import { z } from 'zod';

export async function parseResumeAction(formData: FormData) {
  // Get the uploaded file
  const file = formData.get('resume');
  if (!file || !(file instanceof File)) {
    return { error: 'No file uploaded.' };
  }

  // Read file as Data URI
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const mimeType = file.type || 'application/pdf';
  const resumeDataUri = `data:${mimeType};base64,${base64}`;

  // Parse resume
  try {
    const data = await parseResume({ resumeDataUri });
    return { data };
  } catch (error) {
    return { error: 'Failed to parse resume.' };
  }
}
