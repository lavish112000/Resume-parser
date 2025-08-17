'use client';
import type { ResumeData, StyleOptions } from '@/lib/types';
import { Mail, Phone } from 'lucide-react';
import { CSSProperties } from 'react';

type TemplateProps = {
  data: ResumeData;
  styleOptions: StyleOptions;
};

export function ClassicTemplate({ data, styleOptions }: TemplateProps) {
  const { name, email, phone, summary, experience, education, skills } = data;

  const cssVariables = {
    '--primary-color': styleOptions.color,
    '--font-family': styleOptions.fontFamily,
    '--font-size': styleOptions.fontSize,
    '--margin': styleOptions.margin,
  } as CSSProperties;

  return (
    <div className="a4-page bg-white" style={cssVariables}>
      <style jsx global>{`
        .a4-page {
          width: 210mm;
          min-height: 297mm;
          padding: var(--margin);
          margin: 0 auto;
          font-family: var(--font-family), sans-serif;
          font-size: var(--font-size);
          line-height: 1.5;
          color: #1f2937;
        }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 1rem; margin-bottom: 1.5rem; }
        h1 { font-size: 2.5em; margin-bottom: 0.25rem; font-weight: 700; color: #111827; }
        .contact-info { display: flex; gap: 1.5rem; justify-content: center; font-size: 0.9em; }
        .contact-item { display: flex; align-items: center; gap: 0.5rem; }
        h2 { font-size: 1.2em; text-transform: uppercase; color: var(--primary-color); letter-spacing: 0.05em; border-bottom: 1px solid #ddd; padding-bottom: 0.25rem; margin-top: 1.5rem; margin-bottom: 1rem; font-weight: 600; }
        h3 { font-size: 1.05em; font-weight: bold; color: #111827 }
        .experience-item, .education-item { margin-bottom: 1.25rem; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem; }
        .skills-section { text-align: center; }
        .skills-list { display: inline-block; text-align: left; }
        .prose {
            --tw-prose-body: #374151;
            --tw-prose-bullets: #4b5563;
        }
      `}</style>
      
      <header className="header">
        <h1>{name}</h1>
        <div className="contact-info">
          <div className="contact-item"><Mail size={14} /> {email}</div>
          <div className="contact-item"><Phone size={14} /> {phone}</div>
        </div>
      </header>

      <section>
        <h2>Summary</h2>
        <p>{summary}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {experience?.map((job, index) => (
          <div key={index} className="experience-item">
            <div className="item-header">
              <h3>{job.title}, <span>{job.company}</span></h3>
              <span className="text-sm text-gray-600">{job.dates}</span>
            </div>
            <div className="text-sm prose" dangerouslySetInnerHTML={{ __html: `<ul>${job.description.split('\n').filter(line => line.trim() !== '').map(line => `<li>${line.replace(/^- /, '')}</li>`).join('')}</ul>` }} />
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {education?.map((edu, index) => (
          <div key={index} className="education-item">
            <div className="item-header">
              <h3>{edu.institution}</h3>
              <span className="text-sm text-gray-600">{edu.dates}</span>
            </div>
            <p>{edu.degree}</p>
            {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
          </div>
        ))}
      </section>

      <section className="skills-section">
        <h2>Skills</h2>
        <p className="skills-list">{skills?.join(' · ')}</p>
      </section>
    </div>
  );
}
