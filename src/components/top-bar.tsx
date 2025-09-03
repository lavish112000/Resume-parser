'use client';

import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  User, 
  ChevronDown,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { useAppContext } from '@/contexts/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TopBarProps {
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

export function TopBar({ onSidebarToggle, isSidebarOpen }: TopBarProps) {
  const { currentState, resumeData, fileName } = useAppContext();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getPageTitle = () => {
    switch (currentState) {
      case 'landing':
        return 'Welcome to ResumeForge';
      case 'uploading':
        return 'Upload Your Resume';
      case 'verifying':
        return `Verify ${fileName || 'Resume'} Data`;
      case 'editing':
        return `Editing: ${resumeData?.name || 'Your Resume'}`;
      case 'templates':
        return 'Choose Template';
      case 'previewing':
        return 'Resume Preview';
      case 'dashboard':
        return 'Dashboard';
      default:
        return 'ResumeForge';
    }
  };

  const getPageDescription = () => {
    switch (currentState) {
      case 'landing':
        return 'Create professional, ATS-optimized resumes with AI assistance';
      case 'uploading':
        return 'Upload your existing resume or start from scratch';
      case 'verifying':
        return 'Review and verify the extracted information';
      case 'editing':
        return 'Customize your resume content and formatting';
      case 'templates':
        return 'Select from professionally designed templates';
      case 'previewing':
        return 'Review your resume before downloading';
      case 'dashboard':
        return 'Manage your resumes and track progress';
      default:
        return 'Enterprise-grade resume builder';
    }
  };

  return (
    <header className="glass h-16 flex items-center justify-between px-6 border-b border-white/10">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="btn-glass border-none hover:bg-white/10 lg:hidden"
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </Button>

        <div className="hidden sm:block">
          <h1 className="text-xl font-semibold text-white">{getPageTitle()}</h1>
          <p className="text-sm text-white/60">{getPageDescription()}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <Input
            placeholder="Search templates, examples..."
            className="input-glass pl-10 w-64"
          />
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="btn-glass border-none hover:bg-white/10"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-white" />
          ) : (
            <Moon className="w-5 h-5 text-white" />
          )}
        </Button>

        {/* Language */}
        <Button
          variant="ghost"
          size="sm"
          className="btn-glass border-none hover:bg-white/10 hidden sm:flex"
        >
          <Globe className="w-5 h-5 text-white" />
          <span className="text-white/80 ml-2">EN</span>
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="btn-glass border-none hover:bg-white/10 relative"
        >
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">2</span>
          </span>
        </Button>

        {/* Profile Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="btn-glass border-none hover:bg-white/10 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-white/80 hidden sm:block">John Doe</span>
            <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </Button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 glass-enhanced p-4 z-50 animate-slide-in-bottom">
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">John Doe</div>
                    <div className="text-sm text-white/60">john@example.com</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <button className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded-lg transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded-lg transition-colors">
                    Billing & Plans
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded-lg transition-colors">
                    Help & Support
                  </button>
                  <hr className="border-white/10 my-2" />
                  <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
