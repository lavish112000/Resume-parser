import type { ParseResumeOutput } from '@/ai/flows/parse-resume-data';

export type ResumeData = ParseResumeOutput;

export type Template = 'modern' | 'classic';

export type StyleOptions = {
  fontFamily: string;
  fontSize: string;
  color: string;
  margin: string;
};
