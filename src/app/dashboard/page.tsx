
'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  Award,
  Clock,
  Users,
  Target,
  BarChart3,
  Calendar,
  Star,
  Zap,
  RefreshCw,
  Activity,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  MoreHorizontal,
  Settings,
  Share,
  Download as DownloadIcon
} from 'lucide-react';
import { useAppContext } from '@/contexts/app-context';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { resumeData, navigateToState } = useAppContext();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced real-time data simulation
  const [analyticsData, setAnalyticsData] = useState({
    totalResumes: 12,
    totalDownloads: 487,
    profileViews: 1234,
    atsScore: 94,
    conversionRate: 23.5,
    avgTimeSpent: 8.7,
    topTemplates: [
      { name: 'ATS Professional', usage: 45, growth: 12 },
      { name: 'Modern Executive', usage: 32, growth: 8 },
      { name: 'Classic Professional', usage: 28, growth: -3 },
      { name: 'Creative Portfolio', usage: 18, growth: 15 },
      { name: 'Minimalist Clean', usage: 15, growth: 5 }
    ],
    industryBreakdown: [
      { industry: 'Technology', count: 4, percentage: 33 },
      { industry: 'Finance', count: 3, percentage: 25 },
      { industry: 'Healthcare', count: 2, percentage: 17 },
      { industry: 'Education', count: 2, percentage: 17 },
      { industry: 'Other', count: 1, percentage: 8 }
    ],
    weeklyActivity: [
      { day: 'Mon', downloads: 23, views: 45, resumes: 2 },
      { day: 'Tue', downloads: 31, views: 52, resumes: 3 },
      { day: 'Wed', downloads: 28, views: 48, resumes: 1 },
      { day: 'Thu', downloads: 35, views: 61, resumes: 4 },
      { day: 'Fri', downloads: 42, views: 73, resumes: 2 },
      { day: 'Sat', downloads: 18, views: 32, resumes: 1 },
      { day: 'Sun', downloads: 15, views: 28, resumes: 0 }
    ]
  });

  // Simulate real-time updates with enhanced data
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        totalDownloads: prev.totalDownloads + Math.floor(Math.random() * 3),
        profileViews: prev.profileViews + Math.floor(Math.random() * 5),
        totalResumes: prev.totalResumes + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsLoading(false);
    toast({
      title: "Data Refreshed",
      description: "Dashboard data has been updated with the latest information.",
    });
  };

  const exportData = () => {
    toast({
      title: "Export Started",
      description: "Your analytics data is being prepared for download.",
    });
  };

  const shareDashboard = () => {
    toast({
      title: "Share Link Generated",
      description: "Dashboard link has been copied to your clipboard.",
    });
  };

  const statsCards = [
    {
      title: 'Total Resumes',
      value: analyticsData.totalResumes.toString(),
      change: '+2 this month',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      trend: 'up',
      description: 'Active resume profiles'
    },
    {
      title: 'Total Downloads',
      value: analyticsData.totalDownloads.toString(),
      change: '+23% this week',
      icon: Download,
      color: 'from-green-500 to-green-600',
      trend: 'up',
      description: 'PDF downloads this period'
    },
    {
      title: 'Profile Views',
      value: analyticsData.profileViews.toString(),
      change: '+12% this week',
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
      trend: 'up',
      description: 'Resume view impressions'
    },
    {
      title: 'ATS Score',
      value: `${analyticsData.atsScore}%`,
      change: '+8% improved',
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      trend: 'up',
      description: 'Average ATS compatibility'
    },
    {
      title: 'Conversion Rate',
      value: `${analyticsData.conversionRate}%`,
      change: '+5% this month',
      icon: Target,
      color: 'from-red-500 to-red-600',
      trend: 'up',
      description: 'Views to downloads ratio'
    },
    {
      title: 'Avg. Time Spent',
      value: `${analyticsData.avgTimeSpent}m`,
      change: '+2m this week',
      icon: Clock,
      color: 'from-indigo-500 to-indigo-600',
      trend: 'up',
      description: 'Average session duration'
    }
  ];

  const recentResumes = [
    {
      id: 1,
      name: 'Software Engineer Resume',
      template: 'Technical Specialist',
      lastModified: '2 hours ago',
      status: 'Active',
      downloads: 23,
      views: 145,
      atsScore: 96,
      industry: 'Technology'
    },
    {
      id: 2,
      name: 'Product Manager CV',
      template: 'Modern Executive',
      lastModified: '1 day ago',
      status: 'Draft',
      downloads: 12,
      views: 89,
      atsScore: 92,
      industry: 'Technology'
    },
    {
      id: 3,
      name: 'Data Scientist Profile',
      template: 'Academic Research',
      lastModified: '3 days ago',
      status: 'Active',
      downloads: 45,
      views: 234,
      atsScore: 98,
      industry: 'Technology'
    },
    {
      id: 4,
      name: 'Marketing Manager Resume',
      template: 'Creative Portfolio',
      lastModified: '5 days ago',
      status: 'Active',
      downloads: 18,
      views: 76,
      atsScore: 88,
      industry: 'Marketing'
    },
    {
      id: 5,
      name: 'Financial Analyst CV',
      template: 'Classic Professional',
      lastModified: '1 week ago',
      status: 'Archived',
      downloads: 31,
      views: 156,
      atsScore: 94,
      industry: 'Finance'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Downloaded PDF',
      resume: 'Software Engineer Resume',
      timestamp: '2 hours ago',
      icon: Download,
      type: 'download'
    },
    {
      id: 2,
      action: 'Updated Experience',
      resume: 'Product Manager CV',
      timestamp: '1 day ago',
      icon: Edit,
      type: 'edit'
    },
    {
      id: 3,
      action: 'Changed Template',
      resume: 'Data Scientist Profile',
      timestamp: '2 days ago',
      icon: FileText,
      type: 'template'
    },
    {
      id: 4,
      action: 'Created New Resume',
      resume: 'Marketing Manager Resume',
      timestamp: '3 days ago',
      icon: Plus,
      type: 'create'
    },
    {
      id: 5,
      action: 'Shared Resume',
      resume: 'Financial Analyst CV',
      timestamp: '5 days ago',
      icon: Share,
      type: 'share'
    }
  ];

  return (
    <div className="space-y-8 animate-slide-in-bottom">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Analytics Dashboard 📊
            </h1>
            <p className="text-white/60">
              Comprehensive insights into your resume performance and optimization metrics
            </p>
            <p className="text-white/40 text-sm mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="btn-glass border-white/20 bg-white/5 text-white text-sm px-3 py-2 rounded-lg"
                aria-label="Select time period for analytics data"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <Button
              onClick={refreshData}
              disabled={isLoading}
              variant="outline"
              className="btn-glass border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button
              onClick={exportData}
              variant="outline"
              className="btn-glass border-white/20 text-white hover:bg-white/10"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              onClick={shareDashboard}
              variant="outline"
              className="btn-glass border-white/20 text-white hover:bg-white/10"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-white/20">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="resumes" className="text-white data-[state=active]:bg-white/20">
            Resumes
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-white data-[state=active]:bg-white/20">
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="glass-card border-white/10 hover:scale-105 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex items-center gap-1">
                        {stat.trend === 'up' ? (
                          <ArrowUp className="w-3 h-3 text-green-400" />
                        ) : (
                          <ArrowDown className="w-3 h-3 text-red-400" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                      <p className="text-xs text-white/60 mb-1">{stat.title}</p>
                      <p className="text-xs text-green-400">{stat.change}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Charts and Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Activity Chart */}
            <div className="lg:col-span-2">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Weekly Activity
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Downloads, views, and resume creation over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.weeklyActivity.map((day, index) => (
                      <div key={day.day} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-white">{day.day}</span>
                          </div>
                          <div>
                            <p className="text-sm text-white">{day.resumes} resumes created</p>
                            <p className="text-xs text-white/60">{day.downloads} downloads, {day.views} views</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Progress value={(day.downloads / 50) * 100} className="w-16 h-2" />
                          <span className="text-xs text-white/60 w-8">{day.downloads}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Templates */}
            <div>
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Top Templates
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Most used templates this period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topTemplates.map((template, index) => (
                      <div key={template.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-sm text-white font-medium">{template.name}</p>
                            <p className="text-xs text-white/60">{template.usage} uses</p>
                          </div>
                        </div>
                        <Badge variant={template.growth > 0 ? "default" : "secondary"} className="text-xs">
                          {template.growth > 0 ? '+' : ''}{template.growth}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Industry Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Industry Distribution
                </CardTitle>
                <CardDescription className="text-white/60">
                  Resume distribution across different industries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.industryBreakdown.map((industry) => (
                    <div key={industry.industry} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
                        <span className="text-sm text-white">{industry.industry}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={industry.percentage} className="w-16 h-2" />
                        <span className="text-xs text-white/60 w-12">{industry.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription className="text-white/60">
                  Key performance indicators and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-white mb-1">{analyticsData.conversionRate}%</p>
                    <p className="text-xs text-white/60">Conversion Rate</p>
                    <Badge className="mt-2 bg-green-500/20 text-green-400">+5%</Badge>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-white mb-1">{analyticsData.avgTimeSpent}m</p>
                    <p className="text-xs text-white/60">Avg. Session</p>
                    <Badge className="mt-2 bg-blue-500/20 text-blue-400">+2m</Badge>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-white mb-1">{analyticsData.atsScore}%</p>
                    <p className="text-xs text-white/60">ATS Score</p>
                    <Badge className="mt-2 bg-yellow-500/20 text-yellow-400">+8%</Badge>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-white mb-1">{analyticsData.totalResumes}</p>
                    <p className="text-xs text-white/60">Active Resumes</p>
                    <Badge className="mt-2 bg-purple-500/20 text-purple-400">+2</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resumes" className="space-y-6">
          {/* Recent Resumes */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Resume Management
              </CardTitle>
              <CardDescription className="text-white/60">
                Manage and track your resume portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{resume.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span>{resume.template}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {resume.lastModified}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {resume.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {resume.downloads}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        ATS: {resume.atsScore}%
                      </Badge>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        resume.status === 'Active'
                          ? 'bg-green-500/20 text-green-400'
                          : resume.status === 'Draft'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {resume.status}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-white/10">
                          <Eye className="w-4 h-4 text-white/60" />
                        </Button>
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-white/10">
                          <Edit className="w-4 h-4 text-white/60" />
                        </Button>
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-white/10">
                          <MoreHorizontal className="w-4 h-4 text-white/60" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <Button
                  variant="ghost"
                  className="w-full text-white/60 hover:text-white hover:bg-white/10"
                  onClick={() => navigateToState('landing')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* Activity Feed */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-white/60">
                Latest actions and updates across your resume portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                        activity.type === 'download' ? 'bg-green-500/20' :
                        activity.type === 'edit' ? 'bg-blue-500/20' :
                        activity.type === 'create' ? 'bg-purple-500/20' :
                        activity.type === 'share' ? 'bg-yellow-500/20' :
                        'bg-gray-500/20'
                      }`}>
                        <Icon className="w-4 h-4 text-white/80" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white">
                          <span className="font-medium">{activity.action}</span>
                          <span className="text-white/60"> • {activity.resume}</span>
                        </p>
                        <p className="text-xs text-white/40 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-white/60">
                Common tasks and shortcuts for efficient resume management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="ghost"
                  className="h-auto p-4 flex flex-col items-center gap-3 hover:bg-white/10 text-white/80 hover:text-white"
                  onClick={() => navigateToState('landing')}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">New Resume</span>
                </Button>

                <Button
                  variant="ghost"
                  className="h-auto p-4 flex flex-col items-center gap-3 hover:bg-white/10 text-white/80 hover:text-white"
                  onClick={() => navigateToState('templates')}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">Browse Templates</span>
                </Button>

                <Button
                  variant="ghost"
                  className="h-auto p-4 flex flex-col items-center gap-3 hover:bg-white/10 text-white/80 hover:text-white"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">ATS Analysis</span>
                </Button>

                <Button
                  variant="ghost"
                  className="h-auto p-4 flex flex-col items-center gap-3 hover:bg-white/10 text-white/80 hover:text-white"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">Share Portfolio</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
