'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/top-bar';
import { Sidebar } from '@/components/sidebar';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-enterprise overflow-hidden">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <TopBar 
            onSidebarToggle={toggleSidebar} 
            isSidebarOpen={isSidebarOpen} 
          />
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-enterprise-border/30 scrollbar-track-transparent">
            <div className="min-h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
