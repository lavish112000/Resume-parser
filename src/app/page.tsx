'use client';

import { useState, useRef } from 'react';
import type { ResumeData } from '@/lib/types';
import { parseResume } from '@/ai/flows/parse-resume-data';
import { useToast } from '@/hooks/use-toast';
import { initialData } from '@/lib/initial-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UploadCloud, FileText } from 'lucide-react';
import { ResumeEditor } from '@/components/resume-editor';
import { AppHeader } from '@/components/app-header';

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
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
        const parsedData = await parseResume({ resumeDataUri });
        setResumeData(parsedData);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Parsing Failed',
          description: 'Could not extract data from the resume. Please try another file or create one from scratch.',
        });
        setResumeData(null);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateFromScratch = () => {
    setResumeData(initialData);
  };

  const resetApp = () => {
    setResumeData(null);
    setFileName(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  if (resumeData) {
    return <ResumeEditor initialResumeData={resumeData} onReset={resetApp} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <AppHeader />
      <main className="flex-grow flex items-center justify-center w-full">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">ResumeForge</CardTitle>
            <CardDescription className="text-lg">
              Upload your existing resume to get started in seconds.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-48">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium text-muted-foreground">Parsing "{fileName}"...</p>
                <p className="text-sm text-muted-foreground">This might take a moment.</p>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
              >
                <UploadCloud className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-lg font-semibold text-gray-700">Drag & drop your resume here</p>
                <p className="text-muted-foreground">or click to browse</p>
                <p className="text-xs text-gray-500 mt-2">PDF, DOCX, or TXT</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.txt"
                />
              </div>
            )}
            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="text-muted-foreground">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="mt-6 text-center">
              <Button size="lg" variant="outline" onClick={handleCreateFromScratch}>
                <FileText className="mr-2 h-5 w-5" />
                Create from Scratch
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
