'use client';
import { ModernTemplate } from '@/components/templates/modern';
import { ClassicTemplate } from '@/components/templates/classic';
import { AtsTemplate } from '@/components/templates/ats';
import type { ResumeData, StyleOptions, Template } from '@/lib/types';

type ResumePreviewProps = {
  data: ResumeData;
  template: Template;
  styleOptions: StyleOptions;
};

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

  return (
    <div className="bg-white">
      {renderTemplate()}
    </div>
  );
}
