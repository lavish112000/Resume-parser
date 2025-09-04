'use client';

import React, { useState } from 'react';
import { 
  Home, 
  Upload, 
  FileText, 
  PaintBucket, 
  Eye, 
  BarChart3, 
  BookOpen, 
  Lightbulb,
  Star,
  Crown,
  ChevronRight,
  Play,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts/app-context';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { 
    currentState, 
    resumeData, 
    fileName, 
    navigateToState, 
    history 
  } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();
  
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isUpgradeMinimized, setIsUpgradeMinimized] = useState(false);

  const navigationItems = [
    {
      id: 'landing',
      label: 'Home',
      icon: Home,
      description: 'Start your resume journey',
      color: 'from-blue-500 to-blue-600',
      available: true
    },
    {
      id: 'uploading',
      label: 'Upload Resume',
      icon: Upload,
      description: 'Import existing resume',
      color: 'from-green-500 to-green-600',
      available: true
    },
    {
      id: 'verifying',
      label: 'Verify Data',
      icon: FileText,
      description: 'Review extracted info',
      color: 'from-orange-500 to-orange-600',
      available: !!fileName || !!resumeData
    },
    {
      id: 'editing',
      label: 'Edit Resume',
      icon: PaintBucket,
      description: 'Customize content',
      color: 'from-purple-500 to-purple-600',
      available: !!resumeData
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: Lightbulb,
      description: 'Choose design',
      color: 'from-pink-500 to-pink-600',
      available: true
    },
    {
      id: 'previewing',
      label: 'Preview',
      icon: Eye,
      description: 'Final review',
      color: 'from-indigo-500 to-indigo-600',
      available: !!resumeData
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Analytics & insights',
      color: 'from-teal-500 to-teal-600',
      available: true
    }
  ];

  const quickActions = [
    {
      id: 'examples',
      label: 'View Examples',
      icon: BookOpen,
      path: '/examples',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'blog',
      label: 'Resume Tips',
      icon: Star,
      path: '/blog',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const handleNavigation = (itemId: string) => {
    const item = navigationItems.find(item => item.id === itemId);
    if (item?.available) {
      // Use Next.js router for templates and dashboard pages
      if (itemId === 'templates') {
        router.push('/templates');
      } else if (itemId === 'dashboard') {
        router.push('/dashboard');
      } else {
        // Use state-based navigation for other pages
        navigateToState(itemId as any);
      }
      onClose();
    }
  };

  const handleQuickAction = (path: string) => {
    window.location.href = path;
    onClose();
  };

  const getProgressPercentage = () => {
    const totalSteps = navigationItems.filter(item => item.available).length;
    const completedSteps = history.length;
    return Math.min((completedSteps / totalSteps) * 100, 100);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-80 glass-enhanced z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">ResumeForge</h2>
                <p className="text-sm text-white/60">Enterprise Edition</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Progress</span>
                <span className="text-white/60">{Math.round(getProgressPercentage())}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out progress-bar`}
                  data-progress={getProgressPercentage()}
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-3">
                Resume Builder
              </h3>
              
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentState === item.id;
                const isHovered = hoveredItem === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    disabled={!item.available}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : item.available 
                          ? 'text-white/80 hover:bg-white/10 hover:text-white' 
                          : 'text-white/40 cursor-not-allowed'
                      }
                      ${isHovered && item.available ? 'transform scale-105' : ''}
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${isActive 
                        ? `bg-gradient-to-r ${item.color}` 
                        : 'bg-white/10'
                      }
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                    
                    {item.available && (
                      <ChevronRight className={`
                        w-4 h-4 transition-transform
                        ${isActive ? 'rotate-90' : ''}
                      `} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              
              {quickActions.map((action) => {
                const Icon = action.icon;
                const isHovered = hoveredItem === action.id;
                
                return (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.path)}
                    onMouseEnter={() => setHoveredItem(action.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                      text-white/80 hover:bg-white/10 hover:text-white
                      ${isHovered ? 'transform scale-105' : ''}
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      bg-gradient-to-r ${action.color}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="font-medium">{action.label}</div>
                    </div>
                    
                    <Play className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="glass-card p-4 text-center relative">
              <button
                onClick={() => setIsUpgradeMinimized(!isUpgradeMinimized)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                title={isUpgradeMinimized ? "Expand upgrade section" : "Minimize upgrade section"}
              >
                <ChevronRight className={`w-3 h-3 transition-transform ${isUpgradeMinimized ? 'rotate-90' : '-rotate-90'}`} />
              </button>

              {!isUpgradeMinimized && (
                <>
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-1">Upgrade to Pro</h4>
                  <p className="text-xs text-white/60 mb-3">
                    Unlock premium templates and AI features
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none hover:shadow-lg transition-all duration-200"
                    onClick={() => {
                      toast({
                        title: "Upgrade to Pro",
                        description: "Redirecting to premium plans...",
                      });
                      // Add upgrade logic here
                    }}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Button>
                </>
              )}

              {isUpgradeMinimized && (
                <div className="flex items-center justify-center py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
