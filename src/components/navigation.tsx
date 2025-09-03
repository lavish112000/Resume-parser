'use client';

import React from 'react';
import { ArrowLeft, Home, FileText, Palette, Eye, Settings, Download } from 'lucide-react';
import { useAppContext } from '@/contexts/app-context';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = '' }: NavigationProps) {
  const { currentState, canGoBack, goBack, setState, resumeData } = useAppContext();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'Overview of your resumes',
      available: true,
    },
    {
      id: 'editing',
      label: 'Editor',
      icon: FileText,
      description: 'Edit resume content',
      available: !!resumeData,
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: Palette,
      description: 'Choose template design',
      available: !!resumeData,
    },
    {
      id: 'previewing',
      label: 'Preview',
      icon: Eye,
      description: 'Preview final resume',
      available: !!resumeData,
    },
  ];

  return (
    <nav className={`glass-enhanced p-4 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">ResumeForge</h2>
            <p className="text-xs text-white/60">Enterprise Edition</p>
          </div>
        </div>
        
        {canGoBack && (
          <Button
            variant="outline"
            size="sm"
            onClick={goBack}
            className="btn-glass border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentState === item.id;
          const isAvailable = item.available;

          return (
            <button
              key={item.id}
              onClick={() => isAvailable && setState(item.id as any)}
              disabled={!isAvailable}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300
                ${
                  isActive
                    ? 'bg-white/20 border border-white/30 shadow-lg'
                    : isAvailable
                    ? 'hover:bg-white/10 border border-transparent'
                    : 'opacity-50 cursor-not-allowed'
                }
                ${isAvailable && !isActive ? 'hover:border-white/20' : ''}
              `}
            >
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                      : isAvailable
                      ? 'bg-white/10'
                      : 'bg-white/5'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/70'}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${isActive ? 'text-white' : 'text-white/80'}`}>
                  {item.label}
                </div>
                <div className="text-xs text-white/50 truncate">
                  {item.description}
                </div>
              </div>

              {isActive && (
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-white/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white/70" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-white/80">Settings</div>
              <div className="text-xs text-white/50">Preferences & export</div>
            </div>
          </button>
          
          {resumeData && (
            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 hover:from-emerald-500/30 hover:to-green-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">Export Resume</div>
                <div className="text-xs text-emerald-200">PDF • DOCX • TXT</div>
              </div>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
