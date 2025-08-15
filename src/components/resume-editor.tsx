'use client';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { AppHeader } from '@/components/app-header';
import { ResumeForm } from '@/components/resume-form';
import { ResumePreview } from '@/components/resume-preview';
import { TemplateOptions } from '@/components/template-options';
import type { ResumeData, Template, StyleOptions } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

const experienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  dates: z.string().min(1, 'Dates are required'),
  description: z.string(),
});

const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  dates: z.string().min(1, 'Dates are required'),
  description: z.string().optional(),
});

const resumeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  summary: z.string().min(1, 'Summary is required'),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(z.string().min(1, "Skill cannot be empty")).min(1, "At least one skill is required"),
});


type ResumeEditorProps = {
  initialResumeData: ResumeData;
  onReset: () => void;
};

export function ResumeEditor({ initialResumeData, onReset }: ResumeEditorProps) {
  const [template, setTemplate] = useState<Template>('ats');
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    fontFamily: 'Inter',
    fontSize: '11pt',
    color: '#000000',
    margin: '1.5cm',
  });
  
  const methods = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialResumeData,
    mode: 'onChange'
  });

  const resumeData = methods.watch();

  const handleDownload = () => {
    window.print();
  };
  
  const handleTemplateChange = (newTemplate: Template) => {
    setTemplate(newTemplate);
    if(newTemplate === 'ats') {
        setStyleOptions(prev => ({...prev, color: '#000000', fontFamily: 'Arial, sans-serif' }));
    } else {
        setStyleOptions(prev => ({...prev, color: '#5DADE2', fontFamily: 'Inter' }));
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-screen">
        <AppHeader isEditing onDownload={handleDownload} onReset={onReset}/>
        <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 pt-24 p-8 bg-muted/40">
          <div className="flex flex-col gap-4">
            <TemplateOptions
              template={template}
              setTemplate={handleTemplateChange}
              styleOptions={styleOptions}
              setStyleOptions={setStyleOptions}
            />
            <ScrollArea className="h-[calc(100vh-12rem)] rounded-lg border bg-card p-1">
              <ResumeForm />
            </ScrollArea>
          </div>

          <ScrollArea className="h-[calc(100vh-8rem)] rounded-lg border bg-white shadow-lg">
            <ResumePreview
              data={resumeData}
              template={template}
              styleOptions={styleOptions}
            />
          </ScrollArea>
        </main>
      </div>
    </FormProvider>
  );
}
