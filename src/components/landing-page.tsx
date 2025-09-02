'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UploadCloud, FileText, Bot, FileCheck, Palette } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="w-full pt-20 animate-fade-in-up">
      <section className="container mx-auto text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-4 animate-slide-in-from-top">Build Your Professional Resume in Minutes</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-in-from-top [animation-delay:0.2s]">
          Our AI-powered tool helps you parse your existing resume or build a new one from scratch, with professional templates and AI-driven content suggestions.
        </p>
        <Card className="w-full max-w-2xl mx-auto shadow-xl animate-scale-in [animation-delay:0.4s]">
          <CardHeader>
            <CardTitle className="text-2xl">Get Started</CardTitle>
            <CardDescription>
              Upload your resume to have our AI parse it, or start fresh.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-48">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium text-muted-foreground">Parsing "{fileName}"...</p>
                <p className="text-sm text-muted-foreground">This might take a moment.</p>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-muted/20 transition-colors"
                onDragOver={onDragOver}
                onDrop={onDrop}
                onClick={triggerFileSelect}
              >
                <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-semibold">Drag & drop your resume here</p>
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
              <span className="text-muted-foreground text-sm">OR</span>
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
      </section>

      <section className="bg-background py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Choose Your Template</h2>
          <p className="text-muted-foreground mb-8">Select a template to see how your resume could look.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Modern</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src="https://placehold.co/400x565.png"
                  alt="Modern resume template"
                  data-ai-hint="resume modern"
                  width={400}
                  height={565}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Classic</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src="https://placehold.co/400x565.png"
                  alt="Classic resume template"
                  data-ai-hint="resume classic"
                  width={400}
                  height={565}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted/20 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ResumeForge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center animate-fade-in-up [animation-delay:0.6s]">
              <Bot className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Suggestions</h3>
              <p className="text-muted-foreground">
                Enhance your resume summary and job descriptions with intelligent, impactful suggestions.
              </p>
            </div>
            <div className="p-6 text-center animate-fade-in-up [animation-delay:0.8s]">
              <FileCheck className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Instant Parsing</h3>
              <p className="text-muted-foreground">
                Upload your resume in PDF, DOCX, or TXT format and watch our AI instantly structure your data.
              </p>
            </div>
            <div className="p-6 text-center animate-fade-in-up [animation-delay:1s]">
              <Palette className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-muted-foreground">
                Choose from modern and classic templates with customizable colors, fonts, and layouts.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <Link href="/templates" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full hover:scale-105 transition-transform">
                        Browse Templates
                    </Button>
                </Link>
                <Link href="/examples" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full hover:scale-105 transition-transform">
                        View Examples
                    </Button>
                </Link>
            </div>
        </div>
      </section>


      <footer className="py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 ResumeForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
