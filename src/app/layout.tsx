import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'ResumeForge - Enterprise Resume Builder',
  description: 'Create stunning, ATS-optimized resumes with AI-powered suggestions and professional templates.',
  keywords: 'resume builder, CV maker, ATS optimization, job application, professional resume',
  authors: [{ name: 'ResumeForge Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#6366f1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="font-sans antialiased bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen transition-smooth">
        <div className="page-transition">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
