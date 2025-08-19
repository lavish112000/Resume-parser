import type { ResumeData } from './types';

export const initialData: ResumeData = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '123-456-7890',
  summary:
    'Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing user-centered digital products from initial concept to final, polished deliverable.',
  experience: [
    {
      title: 'Software Engineer',
      company: 'Tech Corp',
      dates: 'Jan 2020 - Present',
      description:
        '• Developed and maintained web applications using React and Node.js\n• Collaborated with cross-functional teams to deliver high-quality software\n• Implemented new features and fixed bugs in existing applications',
    },
    {
      title: 'Junior Developer',
      company: 'Web Solutions',
      dates: 'Jun 2018 - Dec 2019',
      description:
        '• Assisted in the development of websites and web applications\n• Wrote and maintained code using JavaScript, HTML, and CSS\n• Gained experience with Agile development methodologies',
    },
  ],
  education: [
    {
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      dates: 'Aug 2016 - May 2020',
      description: 'GPA: 3.8, Magna Cum Laude',
    },
  ],
  skills: [{name: "React"},{name: "Node.js"},{name: "TypeScript"},{name: "JavaScript"},{name: "HTML"},{name: "CSS"}],
  customSections: [
    {
      title: 'Projects',
      description:
        '• Built a personal portfolio website using Next.js and Tailwind CSS\n• Contributed to open-source projects on GitHub',
    },
  ],
};
