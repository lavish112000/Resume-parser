
'use client';

// UserDashboard is the main dashboard for managing resumes, templates, analytics, and help.
// Provides tabs for different dashboard sections and interactive cards for resume management.
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Download, 
  Edit, 
  Trash2, 
  Plus, 
  TrendingUp, 
  Users, 
  Eye,
  Calendar,
  Star,
  Settings,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

// Type for saved resume objects in dashboard state.
interface SavedResume {
  id: string;
  name: string;
  template: string;
  lastModified: string;
  downloadCount: number;
  atsScore: number;
}

/**
 * Main dashboard component for resume management and analytics.
 * Renders tabs for resumes, analytics, templates, and help.
 */
export function UserDashboard() {
  // State for saved resumes (demo data).
  const [savedResumes] = useState<SavedResume[]>([
    {
      id: '1',
      name: 'Software Engineer Resume',
      template: 'Modern',
      lastModified: '2025-01-15',
      downloadCount: 12,
      atsScore: 92
    },
    {
      id: '2', 
      name: 'Marketing Manager Resume',
      template: 'Classic',
      lastModified: '2025-01-10',
      downloadCount: 8,
      atsScore: 88
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showTemplateToast, setShowTemplateToast] = useState(false);
  const [showEditToast, setShowEditToast] = useState(false);
  const [showDownloadToast, setShowDownloadToast] = useState(false);
  const [showViewAllToast, setShowViewAllToast] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-2">Manage your resumes and track performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
            <Link href="/">
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Create New Resume
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="resumes" className="space-y-6">
          {/* Toasts for button actions */}
          {showEditToast && (
            <div className="fixed top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-up">Edit resume feature coming soon!</div>
          )}
          {showDownloadToast && (
            <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-up">Download started!</div>
          )}
          {showViewAllToast && (
            <div className="fixed top-6 right-6 bg-purple-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-up">Showing all resumes!</div>
          )}
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resumes">My Resumes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="help">Help & Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="resumes">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">4</div>
                      <div className="text-sm text-slate-600">Total Resumes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">24</div>
                      <div className="text-sm text-slate-600">Total Downloads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">90%</div>
                      <div className="text-sm text-slate-600">Avg ATS Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">3</div>
                      <div className="text-sm text-slate-600">Templates Used</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Saved Resumes */}
              <div className="lg:col-span-3 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Saved Resumes</h2>
                  <Button variant="outline" onClick={() => {
                    setShowViewAllToast(true);
                    setTimeout(() => setShowViewAllToast(false), 2000);
                  }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedResumes.map((resume) => (
                    <Card key={resume.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <Badge variant="secondary">{resume.template}</Badge>
                        </div>
                        <CardTitle className="text-lg">{resume.name}</CardTitle>
                        <CardDescription>
                          Last modified: {new Date(resume.lastModified).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>ATS Score</span>
                          <span className="font-medium">{resume.atsScore}%</span>
                        </div>
                        <Progress value={resume.atsScore} className="h-2" />
                        
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => {
                              setShowEditToast(true);
                              setTimeout(() => setShowEditToast(false), 2000);
                            }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => {
                              setShowDownloadToast(true);
                              setTimeout(() => setShowDownloadToast(false), 2000);
                            }}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-sm text-slate-500">
                            {resume.downloadCount} downloads
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add New Resume Card */}
                  <Card className="border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
                      <Plus className="h-12 w-12 text-slate-400 mb-4" />
                      <h3 className="font-medium text-slate-900 mb-2">Create New Resume</h3>
                      <p className="text-sm text-slate-500">Start from scratch or upload an existing resume</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Views</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Profile Visits</span>
                      <span className="font-medium">567</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Application Responses</span>
                      <span className="font-medium">89</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Resume downloaded 2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Profile viewed yesterday</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">New template used 3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Modern Professional', 'Classic Traditional', 'ATS Optimized', 'Creative Design', 'Minimalist', 'Executive'].map((template, idx) => (
                <Card key={template} className={`hover:shadow-lg transition-shadow cursor-pointer ${selectedTemplate === template ? 'border-2 border-blue-500' : ''}`}>
                  <CardHeader>
                    <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-3 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-slate-400" />
                    </div>
                    <CardTitle className="text-lg">{template}</CardTitle>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Free</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.{idx + 5}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" onClick={() => {
                      setSelectedTemplate(template);
                      setShowTemplateToast(true);
                      setTimeout(() => setShowTemplateToast(false), 2000);
                    }}>
                      {selectedTemplate === template ? 'Selected!' : 'Use Template'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="help">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">1</div>
                    <div>
                      <h4 className="font-medium">Upload or Create</h4>
                      <p className="text-sm text-slate-600">Start by uploading your existing resume or create one from scratch</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">2</div>
                    <div>
                      <h4 className="font-medium">Choose Template</h4>
                      <p className="text-sm text-slate-600">Select from our ATS-optimized templates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">3</div>
                    <div>
                      <h4 className="font-medium">Customize & Download</h4>
                      <p className="text-sm text-slate-600">Edit your content and download in PDF or Word format</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ATS Optimization Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Use Standard Headings</h4>
                      <p className="text-sm text-slate-600">Stick to common section titles like "Experience" and "Education"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Include Keywords</h4>
                      <p className="text-sm text-slate-600">Use relevant keywords from the job description</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Keep It Simple</h4>
                      <p className="text-sm text-slate-600">Avoid complex formatting and graphics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
