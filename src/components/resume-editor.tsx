

'use client';

// ResumeEditor is the main editor for creating and updating resume data.
// Uses React Hook Form and Zod for validation and state management.
// Includes tabs for editing and previewing with optimized space usage.
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ResumeForm } from '@/components/resume-form';
import { ResumePreview } from '@/components/resume-preview';
import { TemplateOptions } from '@/components/template-options';
import type { ResumeData, Template, StyleOptions } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { saveResumeToDatabase } from '@/app/actions/server-actions';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

// Zod schemas for validating resume sections.
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
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).optional().default([]),
  skills: z.array(skillCategorySchema).min(1, "At least one skill category is required").default([]),
  customSections: z.array(customSectionSchema).optional().default([]),
  links: z.array(linkSchema).optional().default([]),
});


type ResumeEditorProps = {
  initialResumeData: ResumeData;
  onReset: () => void;
  onDownload: () => void;
  onDownloadDocx?: () => void;
  setLiveResumeData: (data: ResumeData) => void;
  template: Template;
  setTemplate: (template: Template) => void;
  styleOptions: StyleOptions;
  setStyleOptions: (options: StyleOptions) => void;
};

export function ResumeEditor({
  initialResumeData,
  onReset,
  onDownload,
  onDownloadDocx,
  setLiveResumeData,
  template,
  setTemplate,
  styleOptions,
  setStyleOptions,
}: ResumeEditorProps) {
  const [activeTab, setActiveTab] = useState('form');
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const methods = useForm<any>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialResumeData,
    mode: 'onChange'
  });

  const resumeData = methods.watch();

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setLiveResumeData(value as ResumeData);
    });
    return () => subscription.unsubscribe();
  }, [methods, setLiveResumeData]);

  
  const handleTemplateChange = (newTemplate: Template) => {
    setTemplate(newTemplate);
    if(newTemplate === 'ats') {
        setStyleOptions({...styleOptions, color: '#000000', fontFamily: 'Arial, sans-serif' });
    } else {
        setStyleOptions({...styleOptions, color: '#5DADE2', fontFamily: 'Inter' });
    }
  }

  const handleSaveResume = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please sign in to save your resume.'
      });
      return;
    }

    setSaving(true);
    try {
      const title = resumeData.name ? `${resumeData.name}'s Resume` : 'My Resume';
      const result = await saveResumeToDatabase(
        user.id,
        title,
        resumeData,
        template,
        styleOptions
      );

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Resume saved successfully!'
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: error.message || 'Failed to save resume'
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <FormProvider {...methods}>
<<<<<<< HEAD
      <div className="flex flex-col h-screen bg-muted/40">
  <AppHeader isEditing onDownload={onDownload} onDownloadDocx={onDownloadDocx} onReset={onReset}/>
        <main className="flex-grow flex flex-col pt-20 px-4 sm:px-8">
          <div className="pb-4">
            <TemplateOptions />
          </div>
          <div className="flex flex-col md:flex-row gap-8 min-h-0">
            {/* ATS Tips Sidebar */}
            <div className="md:w-80 w-full shrink-0">
              <ATSTipsSidebar resumeData={resumeData} />
=======
      <div className="glass-container h-full p-6 overflow-y-auto">
        {/* Template Options - Compact Layout */}
        <div className="glass-card p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1">
              <TemplateOptions
                template={template}
                setTemplate={handleTemplateChange}
                styleOptions={styleOptions}
                setStyleOptions={setStyleOptions}
              />
>>>>>>> 1b774e0fc667d3a93b6b849817881aba48e8c8a3
            </div>
          </div>
        </div>

        {/* Main Editor Layout - Full Width */}
        <div className="flex flex-col min-h-0">
          {/* Editor Tabs */}
          <div className="flex-grow flex flex-col min-h-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col min-h-0">
              <div className="glass-card p-1 mb-4">
                <TabsList className="grid w-full grid-cols-2 bg-transparent">
                  <TabsTrigger value="form" className="glass-tab">Edit Resume</TabsTrigger>
                  <TabsTrigger value="preview" className="glass-tab">Preview</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="form" className="flex-grow overflow-hidden mt-0">
                <div className="glass-card h-full">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                      <ResumeForm onShowPreview={() => setActiveTab('preview')} />
                    </div>
                  </ScrollArea>
<<<<<<< HEAD
                </TabsContent>
                <TabsContent value="preview" className="flex-grow overflow-hidden">
                  <ScrollArea className="h-full rounded-lg">
                    <div className="p-8 bg-muted/50 flex justify-center">
                      <div className="a4-page-container">
                        <ResumePreview
                          data={resumeData}
                        />
=======
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="flex-grow overflow-hidden mt-0">
                <div className="glass-card h-full">
                  <ScrollArea className="h-full">
                    <div className="p-4 bg-enterprise-surface/10 flex justify-center items-start">
                      <div className="w-full max-w-4xl">
                        <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-enterprise-border/20">
                          <ResumePreview
                            data={resumeData}
                            template={template}
                            styleOptions={styleOptions}
                          />
                        </div>
>>>>>>> 1b774e0fc667d3a93b6b849817881aba48e8c8a3
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Action Buttons - Compact */}
        <div className="glass-card p-4 mt-4">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
            <button 
              onClick={handleSaveResume}
              disabled={saving}
              className="btn-secondary flex-1 sm:flex-none disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Resume'}
            </button>
            <button 
              onClick={onDownload}
              className="btn-primary flex-1 sm:flex-none"
            >
              Download PDF
            </button>
            <button 
              onClick={onDownloadDocx}
              className="btn-secondary flex-1 sm:flex-none"
            >
              Download DOCX
            </button>
            <button 
              onClick={onReset}
              className="btn-outline-danger flex-1 sm:flex-none"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
