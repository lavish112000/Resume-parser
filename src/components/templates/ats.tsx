'use client';
import type { ResumeData, StyleOptions } from '@/lib/types';
import { CSSProperties } from 'react';

type TemplateProps = {
  data: ResumeData;
  styleOptions: StyleOptions;
};

export function AtsTemplate({ data, styleOptions }: TemplateProps) {
  const { name, email, phone, summary, experience, education, skills } = data;

  const cssVariables = {
    '--primary-color': styleOptions.color,
    '--font-family': 'Arial, sans-serif',
    '--font-size': '11pt',
    '--margin': styleOptions.margin,
  } as CSSProperties;

  return (
    <div className="a4-page bg-white text-black" style={cssVariables}>
      <style jsx global>{`
        .a4-page {
          width: 210mm;
          min-height: 297mm;
          padding: var(--margin);
          margin: 0 auto;
          font-family: var(--font-family);
          font-size: var(--font-size);
          line-height: 1.4;
          color: #111827;
        }
        .header { text-align: left; margin-bottom: 1.5rem; }
        h1 { font-size: 2em; margin-bottom: 0.25rem; font-weight: bold; color: black; }
        .contact-info { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; font-size: 0.9em; margin-bottom: 1.5rem; }
        .contact-item { display: flex; align-items: center; gap: 0.5rem; }
        h2 { font-size: 1.2em; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #333; padding-bottom: 0.25rem; margin-top: 1.25rem; margin-bottom: 0.75rem; font-weight: bold; color: black; }
        h3 { font-size: 1em; font-weight: bold; }
        .experience-item, .education-item { margin-bottom: 1rem; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.2rem; }
        .company-name { font-style: normal; }
        .description ul { list-style-type: disc; margin: 0; padding-left: 1.25rem; }
        .description li { margin-bottom: 0.25rem; }
        .skills-list { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; padding: 0; margin: 0; list-style-type: none; }
      `}</style>
      
      <header className="header">
        <h1>{name}</h1>
        <div className="contact-info">
          <div className="contact-item">{email}</div>
          <div className="contact-item">{phone}</div>
        </div>
      </header>

      <section>
        <h2>Professional Summary</h2>
        <p>{summary}</p>
      </section>

      <section>
        <h2>Work Experience</h2>
        {experience?.map((job, index) => (
          <div key={index} className="experience-item">
            <div className="item-header">
              <h3>{job.title}, <span className="company-name">{job.company}</span></h3>
              <span className="text-sm">{job.dates}</span>
            </div>
            <div className="description text-sm" dangerouslySetInnerHTML={{ __html: `<ul>${job.description.split('\n').filter(line => line.trim() !== '').map(line => `<li>${line.replace(/^- /, '')}</li>`).join('')}</ul>` }} />
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {education?.map((edu, index) => (
          <div key={index} className="education-item">
            <div className="item-header">
              <h3>{edu.degree}</h3>
               <span className="text-sm">{edu.dates}</span>
            </div>
             <p>{edu.institution}</p>
            {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <ul className="skills-list">
          {skills?.map((skill, index) => (
            <li key={index}>{skill.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
