'use client';

import { Hammer, Download, Sparkles, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AppHeaderProps = {
  isEditing?: boolean;
  onDownload?: () => void;
  onReset?: () => void;
};

export function AppHeader({ isEditing = false, onDownload, onReset }: AppHeaderProps) {
  return (
    <header className="w-full p-4 bg-white/80 backdrop-blur-md border-b fixed top-0 left-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <Hammer className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">ResumeForge</h1>
        </div>
        {isEditing && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onReset}>
              <RefreshCcw />
              Start Over
            </Button>
            <Button onClick={onDownload}>
              <Download />
              Download PDF
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
