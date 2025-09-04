
'use client';

import React from 'react';
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
  Target
} from 'lucide-react';
import { useAppContext } from '@/contexts/app-context';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { resumeData, navigateToState } = useAppContext();

  const statsCards = [
    {
      title: 'Total Resumes',
      value: '3',
      change: '+2 this month',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Downloads',
      value: '127',
      change: '+23% this week',
      icon: Download,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Profile Views',
      value: '89',
      change: '+12% this week',
      icon: Eye,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'ATS Score',
      value: '94%',
      change: '+8% improved',
      icon: Award,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const recentResumes = [
    {
      id: 1,
      name: 'Software Engineer Resume',
      template: 'Modern',
      lastModified: '2 hours ago',
      status: 'Active',
      downloads: 23
    },
    {
      id: 2,
      name: 'Product Manager CV',
      template: 'ATS Optimized',
      lastModified: '1 day ago',
      status: 'Draft',
      downloads: 12
    },
    {
      id: 3,
      name: 'Data Scientist Profile',
      template: 'Classic',
      lastModified: '3 days ago',
      status: 'Active',
      downloads: 45
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Downloaded PDF',
      resume: 'Software Engineer Resume',
      timestamp: '2 hours ago',
      icon: Download
    },
    {
      id: 2,
      action: 'Updated Experience',
      resume: 'Product Manager CV',
      timestamp: '1 day ago',
      icon: Edit
    },
    {
      id: 3,
      action: 'Changed Template',
      resume: 'Data Scientist Profile',
      timestamp: '2 days ago',
      icon: FileText
    },
    {
      id: 4,
      action: 'Created New Resume',
      resume: 'Software Engineer Resume',
      timestamp: '1 week ago',
      icon: Plus
    }
  ];

  return (
    <div className="space-y-8 animate-slide-in-bottom">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {resumeData?.name || 'Professional'}! 👋
            </h1>
            <p className="text-white/60">
              Here&apos;s an overview of your resume building progress and analytics.
            </p>
          </div>
          <Button 
            onClick={() => navigateToState('landing')}
            className="btn-gradient"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Resume
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="glass-card p-6 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-white/60 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-green-400">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Resumes */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Resumes</h2>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                View All
              </Button>
            </div>
            
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
                          <Download className="w-3 h-3" />
                          {resume.downloads}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      resume.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
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
                        <Trash2 className="w-4 h-4 text-red-400" />
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
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon className="w-4 h-4 text-white/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">
                        <span className="font-medium">{activity.action}</span>
                      </p>
                      <p className="text-xs text-white/60 truncate">{activity.resume}</p>
                      <p className="text-xs text-white/40 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <Button 
                variant="ghost" 
                className="w-full text-white/60 hover:text-white hover:bg-white/10"
                size="sm"
              >
                View All Activity
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        
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
            <span className="font-medium">Share Resume</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
