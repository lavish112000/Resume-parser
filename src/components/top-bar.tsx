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
  Globe,
  Settings,
  HelpCircle,
  LogOut,
  Crown,
  Zap,
  Shield
} from 'lucide-react';
import { useAppContext } from '@/contexts/app-context';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface TopBarProps {
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

export function TopBar({ onSidebarToggle, isSidebarOpen }: TopBarProps) {
  const { currentState, resumeData, fileName } = useAppContext();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, title: 'Resume optimized', message: 'Your resume is now ATS-friendly', unread: true },
    { id: 2, title: 'Template updated', message: 'New modern template available', unread: true }
  ]);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
    if (query.trim()) {
      toast({
        title: 'Search',
        description: `Searching for "${query}"...`,
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
      setIsProfileOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
      });
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: 'Theme Changed',
      description: `Switched to ${!isDarkMode ? 'dark' : 'light'} mode`,
    });
  };

  const handleLanguageChange = () => {
    toast({
      title: 'Language',
      description: 'Language selection coming soon!',
    });
  };

  const handleNotificationsClick = () => {
    toast({
      title: 'Notifications',
      description: `You have ${notifications.filter(n => n.unread).length} unread notifications`,
    });
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="glass h-16 flex items-center justify-between px-6 border-b border-white/10">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="btn-glass border-none hover:bg-white/10 text-white lg:hidden"
          title="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            className="input-glass pl-10 w-64 text-white placeholder:text-white/50"
          />
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleThemeToggle}
          className="btn-glass border-none hover:bg-white/10 text-white"
          title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {/* Language */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLanguageChange}
          className="btn-glass border-none hover:bg-white/10 text-white hidden sm:flex"
          title="Change language"
        >
          <Globe className="w-5 h-5" />
          <span className="text-white/80 ml-2">EN</span>
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNotificationsClick}
          className="btn-glass border-none hover:bg-white/10 text-white relative"
          title="View notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{unreadCount}</span>
            </span>
          )}
        </Button>

        {/* Profile Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="btn-glass border-none hover:bg-white/10 text-white flex items-center gap-2"
            title="User menu"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <span className="text-white/80 hidden sm:block">
              {user?.email?.split('@')[0] || 'User'}
            </span>
            <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </Button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 animate-slide-in-bottom">
              <div className="p-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {user?.email?.split('@')[0] || 'User'}
                    </div>
                    <div className="text-sm text-gray-600">{user?.email || 'user@example.com'}</div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-3">
                    <Settings className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-3">
                    <Crown className="w-4 h-4" />
                    Billing & Plans
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-3">
                    <HelpCircle className="w-4 h-4" />
                    Help & Support
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-3">
                    <Shield className="w-4 h-4" />
                    Privacy & Security
                  </button>
                  <hr className="border-gray-200 my-2" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" />
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
