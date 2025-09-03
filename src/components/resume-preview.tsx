
'use client';

// ResumePreview renders a live preview of the resume using the selected template and style options.
// Supports Modern, Classic, and ATS templates.
import { ModernTemplate } from '@/components/templates/modern';
import { ClassicTemplate } from '@/components/templates/classic';
import { AtsTemplate } from '@/components/templates/ats';
import type { ResumeData, StyleOptions, Template } from '@/lib/types';

// Props for ResumePreview component.
type ResumePreviewProps = {
  data: ResumeData;
  template: Template;
  styleOptions: StyleOptions;
};

/**
 * Renders the resume preview using the selected template and style options.
 * Switches between Modern, Classic, and ATS templates.
 */
export function ResumePreview({ data, template, styleOptions }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} styleOptions={styleOptions} />;
      case 'classic':
        return <ClassicTemplate data={data} styleOptions={styleOptions} />;
      case 'ats':
        return <AtsTemplate data={data} styleOptions={styleOptions} />;
      default:
        return <ModernTemplate data={data} styleOptions={styleOptions} />;
    }
  };

  // Render the selected template preview.
  return (
    <div className="bg-white">
      {renderTemplate()}
    </div>
  );
}
