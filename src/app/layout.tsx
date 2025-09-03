// RootLayout is the top-level layout for all pages in the application.
// It sets up global metadata, theme, fonts, and includes the Toaster for notifications.

import type {Metadata} from 'next';
import './globals.css';
import './globals-enterprise.css';
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from '@/contexts/app-context';
import { AuthProvider } from '@/contexts/auth-context';
import { LayoutWrapper } from '@/components/layout-wrapper';

// Metadata for SEO and browser theming.
export const metadata: Metadata = {
  title: 'ResumeForge - Enterprise Resume Builder',
  description: 'Create stunning, ATS-optimized resumes with AI-powered suggestions and professional templates.',
  keywords: 'resume builder, CV maker, ATS optimization, job application, professional resume',
  authors: [{ name: 'ResumeForge Team' }],
};

// Moved viewport and themeColor into dedicated export per Next.js guidance.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#6366f1',
};

// The main layout component wraps all pages and provides global styles and notification support.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Render the HTML structure, global styles, and Toaster notifications.
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="antialiased min-h-screen">
        <AuthProvider>
          <AppProvider>
            <LayoutWrapper>
              {/* Page transition wrapper for smooth navigation */}
              <div className="page-transition">
                {children}
              </div>
            </LayoutWrapper>
          </AppProvider>
        </AuthProvider>
        {/* Global notification toaster */}
        <Toaster />
      </body>
    </html>
  );
}
