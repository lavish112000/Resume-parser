// RootLayout is the top-level layout for all pages in the application.
// It sets up global metadata, theme, fonts, and includes the Toaster for notifications.

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Metadata for SEO and browser theming.
export const metadata: Metadata = {
  title: 'ResumeForge - Enterprise Resume Builder',
  description: 'Create stunning, ATS-optimized resumes with AI-powered suggestions and professional templates.',
  keywords: 'resume builder, CV maker, ATS optimization, job application, professional resume',
  authors: [{ name: 'ResumeForge Team' }],
  viewport: 'width=device-width, initial-scale=1',
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
        <meta name="theme-color" content="#6366f1" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="font-sans antialiased bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen transition-smooth">
  {/* Page transition wrapper for smooth navigation */}
        <div className="page-transition">
          {children}
        </div>
  {/* Global notification toaster */}
        <Toaster />
      </body>
    </html>
  );
}
