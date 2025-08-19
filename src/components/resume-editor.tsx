
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const customSectionSchema = z.object({
  title: z.string().min(1, 'Section title is required'),
  description: z.string().min(1, 'Section content is required'),
});

const skillSchema = z.object({
  name: z.string().min(1, 'Skill cannot be empty'),
});

const skillCategorySchema = z.object({
  category: z.string().min(1, 'Category title is required'),
  skills: z.array(skillSchema).min(1, 'At least one skill is required in a category'),
});

const linkSchema = z.object({
    label: z.string().min(1, 'Label is required'),
    url: z.string().min(1, 'URL is required').url('Invalid URL format'),
});


const resumeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  summary: z.string().min(1, 'Summary is required'),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillCategorySchema).min(1, "At least one skill category is required"),
  customSections: z.array(customSectionSchema).optional(),
  links: z.array(linkSchema).optional(),
});


type ResumeEditorProps = {
  initialResumeData: ResumeData;
  onReset: () => void;
};

export function ResumeEditor({ initialResumeData, onReset }: ResumeEditorProps) {
  const [activeTab, setActiveTab] = useState('form');
  const [template, setTemplate] = useState<Template>('ats');
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    fontFamily: 'Inter',
    fontSize: '11pt',
    color: '#000000',
    margin: '1.5cm',
    lineHeight: '1.4',
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
      <div className="flex flex-col h-screen bg-muted/40">
        <AppHeader isEditing onDownload={handleDownload} onReset={onReset}/>
        <main className="flex-grow flex flex-col pt-20 px-4 sm:px-8">
            <div className="pb-4">
                <TemplateOptions
                    template={template}
                    setTemplate={handleTemplateChange}
                    styleOptions={styleOptions}
                    setStyleOptions={setStyleOptions}
                />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col min-h-0">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="form">Form</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="form" className="flex-grow overflow-hidden">
                    <ScrollArea className="h-full rounded-lg border bg-card">
                        <ResumeForm onShowPreview={() => setActiveTab('preview')} />
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="preview" className="flex-grow overflow-hidden">
                     <ScrollArea className="h-full rounded-lg">
                        <div className="p-8 bg-muted/50 flex justify-center">
                            <div className="a4-page-container">
                                <ResumePreview
                                data={resumeData}
                                template={template}
                                styleOptions={styleOptions}
                                />
                            </div>
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </main>
      </div>
       <div id="printable-resume" className="hidden">
          <ResumePreview
            data={resumeData}
            template={template}
            styleOptions={styleOptions}
          />
       </div>
    </FormProvider>
  );
}
