
import type { ResumeData, Template } from './types';

export const resumeExamples: { title: string; description: string; slug: string; data: ResumeData, template: Template }[] = [
  {
    title: 'Software Engineer (Modern)',
    slug: 'software-engineer',
    template: 'modern',
    description: 'A strong resume for a mid-level software engineer, highlighting technical skills and project impact.',
    data: {
      name: 'Alex Doe',
      email: 'alex.doe@email.com',
      phone: '111-222-3333',
      links: [
        { label: 'Portfolio', url: 'https://alexdoe.dev' },
        { label: 'GitHub', url: 'https://github.com/alexdoe' },
      ],
      summary: 'Innovative Software Engineer with 5+ years of experience in developing and deploying scalable web applications. Proficient in full-stack development with a strong focus on backend systems and cloud infrastructure. Passionate about writing clean, efficient code and solving complex problems.',
      experience: [
        {
          title: 'Senior Software Engineer',
          company: 'Innovatech Solutions',
          dates: '2021 - Present',
          description: '- Led the development of a new microservices architecture, improving system scalability by 40%.\n- Mentored junior engineers, conducting code reviews and providing technical guidance.\n- Optimized database queries, reducing API response times by 200ms on average.'
        },
        {
          title: 'Software Engineer',
          company: 'Data Systems Inc.',
          dates: '2018 - 2021',
          description: '- Developed key features for a SaaS platform using Python (Django) and React.\n- Collaborated in an Agile team to deliver high-quality software on a bi-weekly sprint schedule.\n- Wrote comprehensive unit and integration tests, increasing code coverage to 90%.'
        }
      ],
      education: [
        {
          institution: 'Georgia Institute of Technology',
          degree: 'M.S. in Computer Science',
          dates: '2016 - 2018',
          description: 'Specialization in Machine Learning'
        }
      ],
      skills: [
        { category: 'Languages', skills: [{ name: 'Python' }, { name: 'JavaScript/TS' }] },
        { category: 'Backend', skills: [{ name: 'Django' }, { name: 'Node.js' }] },
        { category: 'Frontend', skills: [{ name: 'React' }, { name: 'Next.js' }] },
        { category: 'Infrastructure', skills: [{ name: 'AWS' }, { name: 'Docker' }, { name: 'PostgreSQL' }] },
      ]
    }
  },
  {
    title: 'Marketing Manager (ATS)',
    slug: 'marketing-manager',
    template: 'ats',
    description: 'A results-oriented resume for a marketing manager, focusing on campaign success and metrics.',
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '444-555-6666',
       links: [
        { label: 'LinkedIn', url: 'https://linkedin.com/in/janesmith' },
      ],
      summary: 'Dynamic and results-driven Marketing Manager with over 8 years of experience in leading successful marketing campaigns from concept to completion. Proven ability to drive brand growth, increase engagement, and deliver measurable results through data-driven strategies.',
      experience: [
        {
          title: 'Marketing Manager',
          company: 'Creative Minds Agency',
          dates: '2019 - Present',
          description: '- Grew lead generation by 150% in 2 years through targeted digital advertising and content marketing.\n- Managed a team of 5 marketing professionals, overseeing all aspects of campaign execution.\n- Analyzed market trends to identify new opportunities and optimize marketing spend.'
        },
        {
          title: 'Digital Marketing Specialist',
          company: 'BrightHorn SEO',
          dates: '2015 - 2019',
          description: '- Managed SEO/SEM, email marketing, and social media campaigns for B2B clients.\n- Increased organic website traffic by 80% through strategic keyword targeting and content creation.'
        }
      ],
      education: [
        {
          institution: 'University of Florida',
          degree: 'B.A. in Marketing',
          dates: '2011 - 2015',
          description: 'Graduated with honors'
        }
      ],
      skills: [
        { category: 'Strategy', skills: [{ name: 'Digital Marketing' }, { name: 'Content Strategy' }, { name: 'Campaign Management' }] },
        { category: 'Tools', skills: [{ name: 'Google Analytics' }, { name: 'HubSpot' }, { name: 'SEMrush' }] },
        { category: 'Leadership', skills: [{ name: 'Team Leadership' }, { name: 'Budget Management' }] },
      ]
    }
  },
  {
    title: 'Graphic Designer (Classic)',
    slug: 'graphic-designer',
    template: 'classic',
    description: 'A creative resume for a graphic designer, showcasing design skills and a strong portfolio.',
    data: {
      name: 'Sam Wilson',
      email: 'sam.wilson@email.com',
      phone: '777-888-9999',
      links: [
        { label: 'Portfolio', url: 'https://samwilson.design' },
        { label: 'Behance', url: 'https://behance.net/samwilson' },
      ],
      summary: 'Highly creative and detail-oriented Graphic Designer with a passion for visual storytelling. Expertise in branding, print, and digital media. Seeking to leverage design skills to create compelling visual experiences. Portfolio available at samwilson.design.',
      experience: [
        {
          title: 'Lead Graphic Designer',
          company: 'Pixel Perfect Studios',
          dates: '2020 - Present',
          description: '- Led the redesign of the corporate brand identity, resulting in a 30% increase in brand recognition.\n- Designed marketing collateral for print and digital campaigns, including brochures, social media graphics, and web banners.\n- Collaborated with marketing team to develop visually cohesive campaigns.'
        },
        {
          title: 'Junior Designer',
          company: 'Visionary Designs',
          dates: '2017 - 2020',
          description: '- Assisted senior designers with various projects, from concept sketches to final production.\n- Created illustrations and icons for web and mobile applications.'
        }
      ],
      education: [
        {
          institution: 'Rhode Island School of Design (RISD)',
          degree: 'BFA in Graphic Design',
          dates: '2013 - 2017',
          description: ''
        }
      ],
      skills: [
        { category: 'Design Software', skills: [{ name: 'Adobe Photoshop' }, { name: 'Illustrator' }, { name: 'InDesign' }, { name: 'Figma' }] },
        { category: 'Core Skills', skills: [{ name: 'Branding & Identity' }, { name: 'UI/UX Design' }, { name: 'Typography' }, { name: 'Illustration' }] },
      ]
    }
  }
];
