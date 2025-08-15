'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UploadCloud, FileText, Bot } from 'lucide-react';

interface LandingPageProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  triggerFileSelect: () => void;
  onCreateFromScratch: () => void;
  isLoading: boolean;
  fileName: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function LandingPage({
  onFileChange,
  onDragOver,
  onDrop,
  triggerFileSelect,
  onCreateFromScratch,
  isLoading,
  fileName,
  fileInputRef,
}: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <main className="flex-grow flex items-center justify-center w-full">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">AI-Powered Resume Builder</CardTitle>
            <CardDescription className="text-lg">
              Create a professional resume in minutes with the help of AI.
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
                onDragOver={onDragOver}
                onDrop={onDrop}
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
                  onChange={onFileChange}
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
              <Button size="lg" variant="outline" onClick={onCreateFromScratch}>
                <FileText className="mr-2 h-5 w-5" />
                Create from Scratch
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <section className="w-full max-w-4xl mt-12">
        <h2 className="text-2xl font-bold text-center mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <Bot className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered Content</h3>
            <p className="text-muted-foreground">
              Generate professional resume content with the help of our AI assistant.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <FileText className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Multiple Templates</h3>
            <p className="text-muted-foreground">
              Choose from a variety of professionally designed resume templates.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <UploadCloud className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Easy Import</h3>
            <p className="text-muted-foreground">
              Import your existing resume in PDF, DOCX, or TXT format.
            </p>
          </div>
        </div>
      </section>
      <footer className="w-full max-w-4xl mt-12 text-center text-muted-foreground">
        <p>&copy; 2024 ResumeForge. All rights reserved.</p>
      </footer>
    </div>
  );
}
