
"use client";

/**
 * AppHeader
 * ---------
 * Global application header with branding and primary actions.
 *
 * Responsibilities:
 * - Render brand/logo and primary navigation.
 * - Expose contextual actions (Reset, Download PDF/DOCX) when editing.
 *
 * Props contract:
 * - isEditing: whether the app is currently editing a resume (controls which actions are visible)
 * - onDownload / onDownloadDocx: callbacks for generating PDF / DOCX download
 * - onReset: callback to reset the current editing session
 *
 * Implementation notes:
 * - Keep this component purely presentational; heavy actions should be handled by parent/page to
 *   keep header fast and cacheable.
 */
import { Hammer, Download, RefreshCcw, BookOpen, FileText, Palette, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Props for AppHeader component, including editing state and action handlers.
type AppHeaderProps = {
  isEditing?: boolean;
  onDownload?: () => void;
  onDownloadDocx?: () => void;
  onReset?: () => void;
};

/**
 * Main header component for branding and navigation.
 * Shows action buttons for resume editing, download, and reset when editing.
 */
export function AppHeader({ isEditing = false, onDownload, onDownloadDocx, onReset }: AppHeaderProps) {
  // Render the header UI with branding and action buttons.
  return (
    <header className="w-full p-4 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 fixed top-0 left-0 z-50 shadow-lg">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-smooth">
                <Hammer className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ResumeForge
            </h1>
        </Link>
        
        <div className="flex items-center gap-3">
            {isEditing ? (
            <>
                <Button 
                  variant="outline" 
                  onClick={onReset}
                  className="h-11 px-6 border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 text-red-600 transition-smooth rounded-xl"
                >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Start Over
                </Button>
                <Button 
                  onClick={onDownload}
                  className="h-11 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-smooth rounded-xl"
                >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
                </Button>
                {onDownloadDocx && (
                  <Button 
                    onClick={onDownloadDocx}
                    className="h-11 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-smooth rounded-xl"
                  >
                  <Download className="mr-2 h-4 w-4" />
                  Download Docx
                  </Button>
                )}
            </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/templates">
                    <Button 
                      variant="ghost"
                      className="h-11 px-4 hover:bg-purple-50 hover:text-purple-600 transition-smooth rounded-xl"
                    >
                        <Palette className="mr-2 h-4 w-4"/>
                        Templates
                    </Button>
                </Link>
                <Link href="/dashboard">
                    <Button 
                      variant="ghost"
                      className="h-11 px-4 hover:bg-blue-50 hover:text-blue-600 transition-smooth rounded-xl"
                    >
                        <Users className="mr-2 h-4 w-4"/>
                        Dashboard
                    </Button>
                </Link>
                <Link href="/examples">
                    <Button 
                      variant="ghost"
                      className="h-11 px-4 hover:bg-green-50 hover:text-green-600 transition-smooth rounded-xl"
                    >
                        <FileText className="mr-2 h-4 w-4"/>
                        Examples
                    </Button>
                </Link>
                <Link href="/blog">
                    <Button 
                      variant="ghost"
                      className="h-11 px-4 hover:bg-amber-50 hover:text-amber-600 transition-smooth rounded-xl"
                    >
                        <BookOpen className="mr-2 h-4 w-4"/>
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
