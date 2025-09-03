"use client";

/**
 * ATSTipsSidebar
 * ---------------
 * Provides quick, actionable ATS optimization tips based on the provided
 * `ResumeData`. The component performs lightweight checks (contact info,
 * summary length, experience completeness, skills) and presents user-friendly
 * recommendations.
 */

import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Info, CheckCircle, AlertTriangle } from 'lucide-react';
import type { ResumeData } from '@/lib/types';

interface ATSTipsSidebarProps {
  resumeData: ResumeData;
}

// Simple ATS checks (expand as needed)
function getATSTips(resumeData: ResumeData) {
  const tips = [];

  // Contact information checks
  if (!resumeData.name || !resumeData.email || !resumeData.phone) {
    tips.push({
      type: 'warning',
      title: 'Missing Contact Information',
      description: 'Include your full name, professional email address, and phone number at the top of your resume.'
    });
  }

  // Professional summary checks
  if (!resumeData.summary) {
    tips.push({
      type: 'warning',
      title: 'Add Professional Summary',
      description: 'Include a 2-3 sentence summary highlighting your key qualifications and career objectives.'
    });
  } else if (resumeData.summary.length < 100) {
    tips.push({
      type: 'info',
      title: 'Expand Your Summary',
      description: 'Consider expanding your professional summary to 100-200 characters for better impact.'
    });
  }

  // Work experience checks
  if (!resumeData.experience || resumeData.experience.length === 0) {
    tips.push({
      type: 'warning',
      title: 'Add Work Experience',
      description: 'Include your relevant work experience with specific achievements and quantified results.'
    });
  } else {
    const incompleteJobs = resumeData.experience.filter(job => 
      !job.title || !job.company || !job.dates || !job.description
    );
    if (incompleteJobs.length > 0) {
      tips.push({
        type: 'info',
        title: 'Complete Experience Details',
        description: `${incompleteJobs.length} experience entries are missing required information.`
      });
    }
  }

  // Education checks
  if (!resumeData.education || resumeData.education.length === 0) {
    tips.push({
      type: 'info',
      title: 'Add Education',
      description: 'Include your educational background, especially if relevant to your target role.'
    });
  }

  // Skills checks
  if (!resumeData.skills || resumeData.skills.length === 0) {
    tips.push({
      type: 'warning',
      title: 'Add Skills Section',
      description: 'Include relevant technical and soft skills that match job requirements.'
    });
  } else {
    const totalSkills = resumeData.skills.reduce((acc, category) => acc + category.skills.length, 0);
    if (totalSkills < 6) {
      tips.push({
        type: 'info',
        title: 'Add More Skills',
        description: 'Include 8-12 relevant skills to improve keyword matching with job descriptions.'
      });
    }
  }

  // Keyword density check
  const allText = [
    resumeData.name,
    resumeData.summary,
    ...(resumeData.experience?.map(exp => `${exp.title} ${exp.company} ${exp.description}`) || []),
    ...(resumeData.education?.map(edu => `${edu.degree} ${edu.institution}`) || []),
    ...(resumeData.skills?.flatMap(cat => cat.skills.map(skill => skill.name)) || [])
  ].join(' ').toLowerCase();

  const commonKeywords = ['management', 'leadership', 'project', 'team', 'analysis', 'communication'];
  const foundKeywords = commonKeywords.filter(keyword => allText.includes(keyword));
  
  if (foundKeywords.length < 3) {
    tips.push({
      type: 'info',
      title: 'Include Industry Keywords',
      description: 'Add relevant industry keywords to improve ATS matching and ranking.'
    });
  }

  // Format optimization
  if (resumeData.links && resumeData.links.length === 0) {
    tips.push({
      type: 'info',
      title: 'Add Professional Links',
      description: 'Consider adding links to your LinkedIn profile, portfolio, or relevant professional websites.'
    });
  }

  // Success message when all checks pass
  if (tips.length === 0) {
    tips.push({
      type: 'success',
      title: 'Excellent ATS Optimization!',
      description: 'Your resume meets all major ATS optimization criteria and should perform well in automated screening.'
    });
  }

  return tips;
}

export function ATSTipsSidebar({ resumeData }: ATSTipsSidebarProps) {
  const tips = getATSTips(resumeData);

  return (
    <aside className="w-full md:w-80 p-4 bg-card border rounded-lg shadow-md mb-4 md:mb-0">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Badge variant="outline">ATS Tips</Badge>
        <Info className="h-5 w-5 text-primary" />
      </h2>
      <div className="space-y-4">
        {tips.map((tip, idx) => (
          <Alert key={idx} variant={tip.type === 'warning' ? 'destructive' : 'default'}>
            {tip.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
            {tip.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
            {tip.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
            <AlertTitle>{tip.title}</AlertTitle>
            <AlertDescription>{tip.description}</AlertDescription>
          </Alert>
        ))}
      </div>
    </aside>
  );
}
