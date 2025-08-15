import type { ResumeData } from './types';

export const initialData: ResumeData = {
  name: 'Your Name',
  email: 'your.email@example.com',
  phone: '123-456-7890',
  summary: 'A brief professional summary about yourself, your skills, and your career goals.',
  experience: [
    {
      title: 'Job Title',
      company: 'Company Name',
      dates: 'Month Year - Present',
      description: '- Responsibility or achievement 1\n- Responsibility or achievement 2',
    },
  ],
  education: [
    {
      institution: 'University Name',
      degree: 'Degree or Major',
      dates: 'Month Year - Month Year',
      description: 'Optional details about your studies.',
    },
  ],
  skills: ['Skill 1', 'Skill 2', 'Skill 3'],
};
