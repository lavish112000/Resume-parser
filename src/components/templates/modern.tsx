'use client';

import type { ResumeData, StyleOptions } from '@/lib/types';
import { Mail, Phone } from 'lucide-react';
import { CSSProperties } from 'react';

type TemplateProps = {
  data: ResumeData;
  styleOptions: StyleOptions;
};

export function ModernTemplate({ data, styleOptions }: TemplateProps) {
  const { name, email, phone, summary, experience, education, skills, customSections } = data;
  
  const cssVariables = {
    '--primary-color': styleOptions.color,
    '--font-family': styleOptions.fontFamily,
    '--font-size': styleOptions.fontSize,
    '--margin': styleOptions.margin,
  } as CSSProperties;
  
  const formatDescription = (description: string) => {
    if (!description) return '';
    const listItems = description
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => `<li>${line.replace(/^- ?/, '').trim()}</li>`)
      .join('');
    return `<ul>${listItems}</ul>`;
  };

  const mainContent = (
    <>
      <h2>Experience</h2>
      {experience?.map((job, index) => (
        <div key={index} className="experience-item">
          <div className="experience-header">
            <h3>{job.title} | <span className="company-name">{job.company}</span></h3>
            <span className="text-sm text-gray-600">{job.dates}</span>
          </div>
          <div className="text-sm prose" dangerouslySetInnerHTML={{ __html: formatDescription(job.description) }} />
        </div>
      ))}
      {customSections?.map((section, index) => {
        if (index % 2 === 0) { // even index custom sections go to main content
          return (
            <div key={index}>
              <h2>{section.title}</h2>
              <div className="text-sm prose" dangerouslySetInnerHTML={{ __html: formatDescription(section.description) }} />
            </div>
          )
        }
        return null;
      })}
    </>
  );

  const sidebarContent = (
    <>
      <h2>Education</h2>
      {education?.map((edu, index) => (
        <div key={index} className="education-item">
          <h3>{edu.degree}</h3>
          <p className="text-sm text-gray-700">{edu.institution}</p>
          <p className="text-xs text-gray-500">{edu.dates}</p>
          {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
        </div>
      ))}

      <h2>Skills</h2>
      {skills?.map((category, index) => (
        <div key={index} className="skills-category">
            <h4 className="skills-category-title">{category.category}</h4>
            <div className="skills-list">
            {category.skills?.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-item">{skill.name}</span>
            ))}
            </div>
        </div>
      ))}


      {customSections?.map((section, index) => {
        if (index % 2 !== 0) { // odd index custom sections go to sidebar
          return (
            <div key={index}>
              <h2>{section.title}</h2>
              <div className="text-sm prose" dangerouslySetInnerHTML={{ __html: formatDescription(section.description) }} />
            </div>
          )
        }
        return null;
      })}
    </>
  );


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
        h1, h2, h3, h4 { color: var(--primary-color); }
        h1 { font-size: 2.25em; margin-bottom: 0.25rem; font-weight: 700; }
        h2 { font-size: 1.25em; border-bottom: 2px solid var(--primary-color); padding-bottom: 0.25rem; margin-top: 1.5rem; margin-bottom: 1rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
        h3 { font-size: 1.1em; font-weight: 600; }
        h4 { font-size: 1em; font-weight: 600; margin-bottom: 0.5rem; }
        .contact-info { display: flex; gap: 1.5rem; justify-content: center; margin-bottom: 1.5rem; font-size: 0.9em; }
        .contact-item { display: flex; align-items: center; gap: 0.5rem; }
        .section-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
        .skills-category { margin-bottom: 1rem; }
        .skills-category-title { font-size: 1em; font-weight: 600; margin-bottom: 0.5rem; color: var(--primary-color); }
        .skills-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .skill-item { background-color: #e8e8e8; color: #333; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.9em; }
        .experience-item, .education-item { margin-bottom: 1.25rem; }
        .experience-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem; }
        .job-title { font-size: 1.1em; font-weight: bold; }
        .company-name { font-style: italic; }
        .prose {
            --tw-prose-body: #374151;
            --tw-prose-bullets: #4b5563;
        }
      `}</style>
      
      <header className="text-center mb-6">
        <h1>{name}</h1>
        <div className="contact-info">
          <div className="contact-item"><Mail size={14} /> {email}</div>
          <div className="contact-item"><Phone size={14} /> {phone}</div>
        </div>
      </header>

      <div className="summary-section text-center mb-6">
        <p>{summary}</p>
      </div>

      <div className="section-grid">
        <div className="main-content">
          {mainContent}
        </div>
        
        <div className="sidebar-content">
          {sidebarContent}
        </div>
      </div>
    </div>
  );
}
