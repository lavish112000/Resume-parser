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
import { LandingPage } from '@/components/landing-page';
import { VerificationStep } from '@/components/verification-step';
import { ResumePreview } from '@/components/resume-preview';
import { useAppContext } from '@/contexts/app-context';
import type { StyleOptions, Template } from '@/lib/types';

/**
 * Main page component for resume upload, parsing, and editing.
 * Handles file input, drag-and-drop, template selection, and style customization.
 */
export default function Home() {
  // Use app context for state management
  const { 
    currentState,
    resumeData,
    fileName,
    setResumeData,
    setFileName,
    navigateToState,
    parsedData,
    setParsedData
  } = useAppContext();

  // Local state for UI-specific features
  const [isLoading, setIsLoading] = useState(false);
  const [template, setTemplate] = useState<Template>('ats');
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    fontFamily: 'Inter',
    fontSize: '11pt',
    color: '#000000',
    margin: '1.5cm',
    lineHeight: '1.4',
    skillSpacing: '0.5rem',
  });
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [html2pdf, setHtml2pdf] = useState<unknown>(null);

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
    navigateToState('uploading');

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
        navigateToState('verifying');
      } catch (error) {
        console.error('Resume parsing error:', error);
        toast({
          variant: 'destructive',
          title: 'Parsing Failed',
          description: 'Could not extract data from the resume. Please try another file or create one from scratch.',
        });
        setParsedData(null);
        navigateToState('landing');
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleVerificationComplete = (data: ResumeData) => {
    setResumeData(data);
    setParsedData(null);
    navigateToState('editing');
  };
  
  const handleCreateFromScratch = () => {
    setResumeData(initialData);
    navigateToState('editing');
  };

  const resetApp = () => {
    setResumeData(null);
    setParsedData(null);
    setFileName(null);
    navigateToState('landing');
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Preload html2pdf on client mount so it's available on-demand.
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    (async () => {
      try {
        console.log('Loading html2pdf...');
        
        // Import the main module
        const html2pdfModule = await import('html2pdf.js');
        console.log('Main module loaded:', html2pdfModule);
        console.log('Module keys:', Object.keys(html2pdfModule));
        console.log('Module default:', html2pdfModule.default);
        console.log('Type of default:', typeof html2pdfModule.default);
        
        // Check if default export is a function
        if (typeof html2pdfModule.default === 'function') {
          console.log('Using module default export as function');
          setHtml2pdf(html2pdfModule.default);
          return;
        }
        
        // Check if there's a named export
        if (typeof (html2pdfModule as { html2pdf?: unknown }).html2pdf === 'function') {
          console.log('Using named export html2pdf');
          setHtml2pdf((html2pdfModule as { html2pdf?: unknown }).html2pdf);
          return;
        }
        
        // Fallback: try loading the bundle and wait for window attachment
        console.log('Trying bundle import...');
        await import('html2pdf.js/dist/html2pdf.bundle.min.js');
        
        // Give the bundle time to attach to window
        timeoutId = setTimeout(() => {
          const windowHtml2pdf = (window as any).html2pdf;
          console.log('window.html2pdf after timeout:', windowHtml2pdf);
          console.log('Type of window.html2pdf:', typeof windowHtml2pdf);
          
          if (typeof windowHtml2pdf === 'function') {
            setHtml2pdf(windowHtml2pdf);
          } else {
            console.error('html2pdf not available as function on window after bundle load');
          }
        }, 100);
        
      } catch (err) {
        console.error('Could not preload html2pdf', err);
      }
    })();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // PDF export using html2pdf.js
  const handleDownloadPDF = async () => {
    console.log('handleDownloadPDF called, html2pdf state:', html2pdf);
    console.log('Type of html2pdf:', typeof html2pdf);
    
    // If html2pdf isn't loaded yet, try loading it on-demand
    if (!html2pdf || typeof html2pdf !== 'function') {
      console.log('html2pdf not ready, attempting on-demand load...');
      try {
        // Try main module first
        const html2pdfModule = await import('html2pdf.js');
        let html2pdfInstance = null;
        
        if (typeof html2pdfModule.default === 'function') {
          html2pdfInstance = html2pdfModule.default;
          console.log('Using module default for on-demand load');
        } else if (typeof (html2pdfModule as any).html2pdf === 'function') {
          html2pdfInstance = (html2pdfModule as any).html2pdf;
          console.log('Using named export for on-demand load');
        } else {
          // Try bundle approach
          await import('html2pdf.js/dist/html2pdf.bundle.min.js');
          html2pdfInstance = (window as any).html2pdf;
          console.log('Using window.html2pdf for on-demand load:', html2pdfInstance);
        }
        
        if (!html2pdfInstance || typeof html2pdfInstance !== 'function') {
          console.error('html2pdf still not available after on-demand load');
          toast({
            variant: 'destructive',
            title: 'PDF export not ready',
            description: 'The PDF library failed to load. Please refresh the page and try again.'
          });
          return;
        }
        
        // Use the on-demand loaded instance
        generatePDF(html2pdfInstance);
        return;
      } catch (err) {
        console.error('On-demand load failed:', err);
        toast({
          variant: 'destructive',
          title: 'PDF export not ready',
          description: 'The PDF library is still loading. Please try again in a moment.'
        });
        return;
      }
    }

    generatePDF(html2pdf);
  };

  const generatePDF = (html2pdfInstance: unknown) => {
    console.log('generatePDF called with:', html2pdfInstance);
    console.log('Type of html2pdfInstance:', typeof html2pdfInstance);
    
    if (typeof html2pdfInstance !== 'function') {
      console.error('html2pdfInstance is not a function:', html2pdfInstance);
      toast({
        variant: 'destructive',
        title: 'PDF generation failed',
        description: 'Invalid PDF library instance. Please refresh and try again.'
      });
      return;
    }

    // Create a temporary container for the resume content
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '210mm'; // A4 width
    tempContainer.style.minHeight = '297mm'; // A4 height
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '20mm';
    tempContainer.style.boxSizing = 'border-box';
    document.body.appendChild(tempContainer);

    // Render the resume preview into the temporary container
    const resumeElement = document.createElement('div');
    const safeResumeData = resumeData || {};
    resumeElement.innerHTML = `
      <div style="font-family: ${styleOptions.fontFamily}; font-size: ${styleOptions.fontSize}; color: ${styleOptions.color}; line-height: ${styleOptions.lineHeight};">
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 10px; color: #2563eb;">${safeResumeData.name || 'Your Name'}</h1>
        <div style="margin-bottom: 15px;">
          <p style="margin: 0; color: #6b7280;">${safeResumeData.email || 'your.email@example.com'} | ${safeResumeData.phone || 'Your Phone'}</p>
        </div>
        
        ${safeResumeData.summary ? `
          <div style="margin-bottom: 20px;">
            <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">Professional Summary</h2>
            <p style="margin: 0; line-height: 1.6;">${safeResumeData.summary}</p>
          </div>
        ` : ''}
        
        ${safeResumeData.experience && safeResumeData.experience.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">Experience</h2>
            ${safeResumeData.experience.map(exp => `
              <div style="margin-bottom: 15px;">
                <h3 style="font-size: 16px; font-weight: bold; margin: 0; color: #1f2937;">${exp.title || 'Job Title'}</h3>
                <p style="margin: 2px 0; color: #6b7280; font-weight: 500;">${exp.company || 'Company Name'}</p>
                <p style="margin: 2px 0; color: #9ca3af; font-size: 14px;">${exp.dates || 'Dates'}</p>
                ${exp.description ? `<p style="margin: 8px 0; line-height: 1.6;">${exp.description}</p>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${safeResumeData.education && safeResumeData.education.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">Education</h2>
            ${safeResumeData.education.map(edu => `
              <div style="margin-bottom: 15px;">
                <h3 style="font-size: 16px; font-weight: bold; margin: 0; color: #1f2937;">${edu.degree || 'Degree'}</h3>
                <p style="margin: 2px 0; color: #6b7280; font-weight: 500;">${edu.institution || 'Institution'}</p>
                <p style="margin: 2px 0; color: #9ca3af; font-size: 14px;">${edu.dates || 'Dates'}</p>
                ${edu.description ? `<p style="margin: 8px 0; line-height: 1.6;">${edu.description}</p>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${safeResumeData.skills && safeResumeData.skills.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">Skills</h2>
            ${safeResumeData.skills.map(skillCat => `
              <div style="margin-bottom: 12px;">
                <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 6px; color: #374151;">${skillCat.category || 'Skills'}</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  ${skillCat.skills && skillCat.skills.length > 0 ? skillCat.skills.map(skill => `<span style="background-color: #f3f4f6; color: #374151; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${skill.name || 'Skill'}</span>`).join('') : ''}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${safeResumeData.customSections && safeResumeData.customSections.length > 0 ? `
          ${safeResumeData.customSections.map(section => `
            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">${section.title || 'Section'}</h2>
              <p style="margin: 0; line-height: 1.6;">${section.description || 'Description'}</p>
            </div>
          `).join('')}
        ` : ''}
        
        ${safeResumeData.links && safeResumeData.links.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">Links</h2>
            ${safeResumeData.links.map(link => `
              <div style="margin-bottom: 8px;">
                <a href="${link.url || '#'}" style="color: #2563eb; text-decoration: none;" target="_blank">${link.label || 'Link'}</a>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
    
    tempContainer.appendChild(resumeElement);

    try {
      html2pdfInstance().from(tempContainer).set({
        margin: 0.5,
        filename: `${(safeResumeData.name || 'resume').replace(/\s+/g, '_')}_resume.pdf`,
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        }
      }).save().then(() => {
        document.body.removeChild(tempContainer);
        toast({
          title: 'PDF Downloaded',
          description: 'Your resume has been downloaded successfully!',
        });
      }).catch((error: any) => {
        console.error('PDF save failed:', error);
        document.body.removeChild(tempContainer);
        toast({
          variant: 'destructive',
          title: 'PDF Download Failed',
          description: 'There was an error saving your PDF. Please try again.',
        });
      });
    } catch (err) {
      console.error('Failed to generate PDF', err);
      document.body.removeChild(tempContainer);
      toast({
        variant: 'destructive',
        title: 'PDF generation failed',
        description: 'An error occurred while creating the PDF. Please try again.'
      });
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

  // Render based on current state
  switch (currentState) {
    case 'editing':
      if (resumeData) {
        return (
          <>
            <ResumeEditor
              initialResumeData={resumeData}
              onReset={resetApp}
              onDownload={handleDownloadPDF}
              template={template}
              setTemplate={setTemplate}
              styleOptions={styleOptions}
              setStyleOptions={setStyleOptions}
              setLiveResumeData={setResumeData}
              onDownloadDocx={handleDownloadDocx}
            />
            <div id="printable-resume" className="hidden">
              <ResumePreview
                data={resumeData}
                template={template}
                styleOptions={styleOptions}
              />
            </div>
          </>
        );
      }
      break;

    case 'verifying':
      if (parsedData) {
        return (
          <div className="glass-container animate-slide-in-bottom">
            <VerificationStep
              parsedData={parsedData}
              onComplete={handleVerificationComplete}
              onCancel={resetApp}
              fileName={fileName}
            />
          </div>
        );
      }
      break;

    case 'uploading':
    case 'landing':
    default:
      return (
        <div className="glass-container animate-slide-in-bottom">
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
        </div>
      );
  }

  // Fallback return
  return (
    <div className="glass-container animate-slide-in-bottom">
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
    </div>
  );
}
