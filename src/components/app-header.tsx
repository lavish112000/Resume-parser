'use client';

import { Hammer, Download, RefreshCcw, BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type AppHeaderProps = {
  isEditing?: boolean;
  onDownload?: () => void;
  onReset?: () => void;
};

export function AppHeader({ isEditing = false, onDownload, onReset }: AppHeaderProps) {
  return (
    <header className="w-full p-4 bg-background/80 backdrop-blur-md border-b border-border/50 fixed top-0 left-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
                <Hammer className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">ResumeForge</h1>
        </Link>
        
        <div className="flex items-center gap-2">
            {isEditing ? (
            <>
                <Button variant="outline" onClick={onReset}>
                <RefreshCcw />
                Start Over
                </Button>
                <Button onClick={onDownload}>
                <Download />
                Download PDF
                </Button>
            </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/examples">
                    <Button variant="ghost">
                        <FileText className="mr-2"/>
                        Examples
                    </Button>
                </Link>
                <Link href="/blog">
                    <Button variant="ghost">
                        <BookOpen className="mr-2"/>
                        Blog
                    </Button>
                </Link>
              </div>
            )}
        </div>
      </div>
    </header>
  );
}
