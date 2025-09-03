'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Download,
  FileText,
  CheckCircle,
  AlertTriangle,
  Info,
  Calendar,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import type { ResumeData } from '@/lib/types';

interface AnalyticsProps {
  resumeData: ResumeData;
}

interface AnalyticsMetric {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: any;
}

const metrics: AnalyticsMetric[] = [
  {
    title: 'Profile Views',
    value: '2,345',
    change: '+12%',
    trend: 'up',
    icon: Eye
  },
  {
    title: 'Resume Downloads',
    value: '456',
    change: '+8%',
    trend: 'up',
    icon: Download
  },
  {
    title: 'Application Responses',
    value: '23',
    change: '+15%',
    trend: 'up',
    icon: Users
  },
  {
    title: 'ATS Compatibility',
    value: '92%',
    change: '+3%',
    trend: 'up',
    icon: CheckCircle
  }
];

export function ResumeAnalytics({ resumeData }: AnalyticsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate ATS score based on resume data
  const calculateATSScore = (data: ResumeData): number => {
    let score = 0;
    
    // Contact information (20 points)
    if (data.name && data.email && data.phone) score += 20;
    
    // Summary (15 points)
    if (data.summary && data.summary.length > 50) score += 15;
    
    // Experience (25 points)
    if (data.experience && data.experience.length > 0) {
      score += Math.min(25, data.experience.length * 8);
    }
    
    // Education (15 points)
    if (data.education && data.education.length > 0) score += 15;
    
    // Skills (15 points)
    if (data.skills && data.skills.length > 0) {
      const totalSkills = data.skills.reduce((acc, category) => acc + category.skills.length, 0);
      score += Math.min(15, totalSkills * 2);
    }
    
    // Additional sections (10 points)
    if (data.customSections && data.customSections.length > 0) score += 5;
    if (data.links && data.links.length > 0) score += 5;
    
    return Math.min(100, score);
  };

  const atsScore = calculateATSScore(resumeData);

  const getATSRecommendations = (data: ResumeData) => {
    const recommendations = [];
    
    if (!data.name || !data.email || !data.phone) {
      recommendations.push({
        type: 'error',
        title: 'Missing Contact Information',
        description: 'Ensure you have your full name, email, and phone number.'
      });
    }
    
    if (!data.summary || data.summary.length < 50) {
      recommendations.push({
        type: 'warning',
        title: 'Short Professional Summary',
        description: 'Add a compelling 2-3 sentence summary highlighting your key qualifications.'
      });
    }
    
    if (!data.experience || data.experience.length === 0) {
      recommendations.push({
        type: 'error',
        title: 'No Work Experience',
        description: 'Add your relevant work experience with specific achievements.'
      });
    }
    
    if (!data.skills || data.skills.length === 0) {
      recommendations.push({
        type: 'warning',
        title: 'No Skills Listed',
        description: 'Include relevant technical and soft skills for your target role.'
      });
    }
    
    const totalSkills = data.skills?.reduce((acc, category) => acc + category.skills.length, 0) || 0;
    if (totalSkills < 8) {
      recommendations.push({
        type: 'info',
        title: 'Add More Skills',
        description: 'Include 8-12 relevant skills to improve keyword matching.'
      });
    }
    
    return recommendations;
  };

  const recommendations = getATSRecommendations(resumeData);

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className={`text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 
                      'text-slate-600'
                    }`}>
                      {metric.change} from last month
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 
                    'text-slate-600'
                  }`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ats-score">ATS Score</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="recommendations">Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Profile Views</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Resume Downloads</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Application Success</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>LinkedIn</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                      </div>
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Job Boards</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '30%'}}></div>
                      </div>
                      <span className="text-sm">30%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Direct</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '25%'}}></div>
                      </div>
                      <span className="text-sm">25%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ats-score" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ATS Compatibility Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-primary mb-2">{atsScore}%</div>
                <Badge variant={atsScore >= 90 ? 'default' : atsScore >= 70 ? 'secondary' : 'destructive'}>
                  {atsScore >= 90 ? 'Excellent' : atsScore >= 70 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Contact Information</span>
                    <span>{resumeData.name && resumeData.email && resumeData.phone ? '100%' : '0%'}</span>
                  </div>
                  <Progress value={resumeData.name && resumeData.email && resumeData.phone ? 100 : 0} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Professional Summary</span>
                    <span>{resumeData.summary && resumeData.summary.length > 50 ? '100%' : '0%'}</span>
                  </div>
                  <Progress value={resumeData.summary && resumeData.summary.length > 50 ? 100 : 0} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Work Experience</span>
                    <span>{resumeData.experience && resumeData.experience.length > 0 ? '100%' : '0%'}</span>
                  </div>
                  <Progress value={resumeData.experience && resumeData.experience.length > 0 ? 100 : 0} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Skills Section</span>
                    <span>{resumeData.skills && resumeData.skills.length > 0 ? '100%' : '0%'}</span>
                  </div>
                  <Progress value={resumeData.skills && resumeData.skills.length > 0 ? 100 : 0} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {resumeData.skills?.flatMap(category => 
                  category.skills.map(skill => (
                    <Badge key={skill.name} variant="outline" className="justify-center">
                      {skill.name}
                    </Badge>
                  ))
                ) || []}
              </div>
              
              {(!resumeData.skills || resumeData.skills.length === 0) && (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No keywords found. Add skills to improve keyword matching.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <Alert key={index} variant={rec.type === 'error' ? 'destructive' : 'default'}>
                {rec.type === 'error' && <AlertTriangle className="h-4 w-4" />}
                {rec.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                {rec.type === 'info' && <Info className="h-4 w-4" />}
                <AlertDescription>
                  <strong>{rec.title}:</strong> {rec.description}
                </AlertDescription>
              </Alert>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Great Job!</h3>
                <p className="text-slate-600">Your resume meets all ATS optimization criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
