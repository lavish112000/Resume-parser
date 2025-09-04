
// Home is the main landing page for the resume builder application.
// It manages resume upload, parsing, editing, template selection, and preview.
'use client';

import { useState, useRef, useEffect } from 'react';
import type { ResumeData } from '@/lib/types';
import { parseResume } from '@/ai/flows/parse-resume-data';
import { useToast } from '@/hooks/use-toast';
import { initialData } from '@/lib/initial-data';
import { useTemplateContext } from '@/context/TemplateContext';
import { ResumeEditor } from '@/components/resume-editor';
import { AppHeader } from '@/components/app-header';
import { LandingPage } from '@/components/landing-page';
import { VerificationStep } from '@/components/verification-step';
import { ResumePreview } from '@/components/resume-preview';
import type { StyleOptions, Template } from '@/lib/types';

/**
 * Main page component for resume upload, parsing, and editing.
 * Handles file input, drag-and-drop, template selection, and style customization.
 */
export default function Home() {
  // State for resume data, parsed data, loading status, file name, template, and style options.
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [parsedData, setParsedData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  // Template and style options are managed by TemplateContext
  const { template, setTemplate, styleOptions, setStyleOptions, openEditorRequest, clearOpenEditorRequest } = useTemplateContext();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Open editor if a template selection from gallery requested it via context.
  useEffect(() => {
    if (openEditorRequest) {
      setResumeData(initialData);
      clearOpenEditorRequest();
    }
  }, [openEditorRequest, clearOpenEditorRequest]);

  /**
   * Handles file input change event for resume upload.
   * @param event - File input change event
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleParseResume(file);
    }
  };

  /**
   * Handles drag over event for drag-and-drop file upload.
   * @param event - Drag event
   */
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
        console.log('Resume Data URI:', resumeDataUri.slice(0, 100)); // Log first 100 chars
        const data = await parseResume({ resumeDataUri });
        console.log('Parsed Resume Data:', data);
        // Fallback: If critical fields are missing, show a warning
        if (!data || !data.name || !data.email || !data.experience || data.experience.length === 0) {
          toast({
            variant: 'default',
            title: 'Partial Extraction',
            description: 'Some data could not be extracted. Please verify and complete missing fields.'
          });
        }
        setParsedData(data);
      } catch (error) {
        console.error('Resume parsing error:', error);
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

  // PDF export using html2pdf.js
  const handleDownloadPDF = () => {
    try {
      import('html2pdf.js').then(html2pdf => {
        const element = document.createElement('div');
        document.body.appendChild(element);
        element.style.display = 'none';
        element.innerHTML = document.getElementById('printable-resume')?.innerHTML || '';
        html2pdf.default().from(element).set({
          margin: 0.5,
          filename: 'resume.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        }).save().then(() => {
          document.body.removeChild(element);
          toast({ title: 'PDF ready', description: 'Your download should begin shortly.' });
        }).catch((err: unknown) => {
          console.error('PDF generation failed', err);
          toast({ variant: 'destructive', title: 'Export failed', description: 'Could not generate PDF. Try again or use Docx export.' });
        });
      }).catch((err: unknown) => {
        console.error('Failed to load html2pdf', err);
        toast({ variant: 'destructive', title: 'Export failed', description: 'PDF export module could not be loaded.' });
      });
    } catch (err: unknown) {
      console.error('Unexpected PDF export error', err);
      toast({ variant: 'destructive', title: 'Export failed', description: 'An unexpected error occurred during PDF export.' });
    }
  };

  // Docx export using docx
  const handleDownloadDocx = async () => {
    try {
      const { Document, Packer, Paragraph, TextRun } = await import('docx');
      // Simple docx export (expand for full resume)
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: resumeData?.name || '', bold: true, size: 32 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun(resumeData?.summary || ''),
              ],
            }),
            // ...add more fields as needed
          ],
        }],
      });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.docx';
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: 'Docx ready', description: 'Your DOCX download should begin shortly.' });
    } catch (err: unknown) {
      console.error('Docx export failed', err);
      toast({ variant: 'destructive', title: 'Export failed', description: 'Could not generate DOCX. Try PDF export.' });
    }
  };

  if (resumeData) {
    return (
      <>
        <ResumeEditor 
          initialResumeData={resumeData} 
          onReset={resetApp} 
          onDownload={handleDownloadPDF}
          setLiveResumeData={setResumeData}
          onDownloadDocx={handleDownloadDocx}
        />
        <div id="printable-resume" className="hidden">
          <ResumePreview
            data={resumeData}
          />
        </div>
      </>
    );
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
