'use client';

import { useState, useRef } from 'react';
import type { ResumeData } from '@/lib/types';
import { parseResume } from '@/ai/flows/parse-resume-data';
import { useToast } from '@/hooks/use-toast';
import { initialData } from '@/lib/initial-data';
import { ResumeEditor } from '@/components/resume-editor';
import { AppHeader } from '@/components/app-header';
import { LandingPage } from '@/components/landing-page';
import { VerificationStep } from '@/components/verification-step';

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [parsedData, setParsedData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleParseResume(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleParseResume(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleParseResume = async (file: File) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: 'Unsupported File Type',
        description: 'Please upload a PDF, DOCX, or TXT file.',
      });
      return;
    }

    setIsLoading(true);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const resumeDataUri = e.target?.result as string;
        if (!resumeDataUri) throw new Error('Could not read file.');
        const data = await parseResume({ resumeDataUri });
        setParsedData(data);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Parsing Failed',
          description: 'Could not extract data from the resume. Please try another file or create one from scratch.',
        });
        setParsedData(null);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleVerificationComplete = (data: ResumeData) => {
    setResumeData(data);
    setParsedData(null);
  };
  
  const handleCreateFromScratch = () => {
    setResumeData(initialData);
  };

  const resetApp = () => {
    setResumeData(null);
    setParsedData(null);
    setFileName(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  if (resumeData) {
    return <ResumeEditor initialResumeData={resumeData} onReset={resetApp} />;
  }

  if (parsedData) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-grow pt-20">
          <VerificationStep 
            parsedData={parsedData} 
            onComplete={handleVerificationComplete} 
            onCancel={resetApp}
            fileName={fileName}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow">
        <LandingPage
          onFileChange={handleFileChange}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          triggerFileSelect={triggerFileSelect}
          onCreateFromScratch={handleCreateFromScratch}
          isLoading={isLoading}
          fileName={fileName}
          fileInputRef={fileInputRef}
        />
      </main>
    </div>
  );
}
