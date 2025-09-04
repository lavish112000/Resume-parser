
// Type definitions for resume data, templates, and style options.
// Used throughout the application for type safety and structure.
import type { ParseResumeOutput } from '@/ai/flows/parse-resume-data';

// ResumeData extends the parsed resume output with custom sections and links.
export type ResumeData = ParseResumeOutput & {
  customSections?: {
    title: string;
    description: string;
  }[];
  // The parser may return partial link data (label/url may be missing),
  // so make these fields optional to match ParseResumeOutput.
  links?: {
    label?: string;
    url?: string;
  }[];
};

// Supported resume template types.
export type Template = 'modern' | 'classic' | 'ats';

// Style options for customizing resume appearance.
export type StyleOptions = {
  fontFamily: string;
  fontSize: string;
  color: string;
  margin: string;
  lineHeight: string;
  skillSpacing: string;
};
