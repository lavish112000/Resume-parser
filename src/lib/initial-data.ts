import type { ResumeData } from './types';

export const initialData: ResumeData = {
  name: 'Taylor Swift',
  email: 'taylor.swift@example.com',
  phone: '123-456-7890',
  summary:
    'Aspiring software engineer with a passion for music and a drive to create innovative and user-friendly applications. Proven ability to learn quickly, adapt to new technologies, and collaborate effectively in a team environment. Eager to contribute to a challenging and rewarding role in the tech industry.',
  experience: [
    {
      title: 'Software Engineer Intern',
      company: 'Google',
      dates: 'May 2023 - August 2023',
      description:
        '- Developed and maintained web applications using React, TypeScript, and Node.js.\n- Collaborated with cross-functional teams to design, develop, and test new features.\n- Wrote and maintained technical documentation.',
    },
    {
      title: 'Freelance Web Developer',
      company: 'Self-employed',
      dates: 'January 2022 - Present',
      description:
        '- Designed and developed custom websites for small businesses and individuals.\n- Managed all aspects of the development process, from initial consultation to deployment and maintenance.',
    },
  ],
  education: [
    {
      institution: 'New York University',
      degree: 'Bachelor of Science in Computer Science',
      dates: 'September 2020 - May 2024',
      description:
        'Relevant coursework: Data Structures, Algorithms, Web Development, Databases, Operating Systems.',
    },
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Git',
    'SQL',
  ],
};
