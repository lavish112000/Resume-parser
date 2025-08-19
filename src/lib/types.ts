import type { ParseResumeOutput } from '@/ai/flows/parse-resume-data';

export type ResumeData = ParseResumeOutput & {
  customSections?: {
    title: string;
    description: string;
  }[];
};

export type Template = 'modern' | 'classic' | 'ats';

export type StyleOptions = {
  fontFamily: string;
  fontSize: string;
  color: string;
  margin: string;
};
