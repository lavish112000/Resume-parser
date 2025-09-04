
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Eye, 
  Download,
  Star,
  Check,
  ArrowRight,
  Search,
  Grid,
  List,
  Filter,
  TrendingUp,
  Users,
  Award,
  Zap,
  Heart,
  Share2,
  BookOpen,
  Target,
  Briefcase,
  GraduationCap,
  Code,
  Palette,
  Globe
} from 'lucide-react';
import { useAppContext } from '@/contexts/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export default function Templates() {
  const { navigateToState, setTemplate } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'downloads'>('popular');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const categories = [
    'All',
    'ATS Optimized',
    'Creative',
    'Professional',
    'Modern',
    'Minimalist',
    'Executive',
    'Academic',
    'Technical',
    'Startup'
  ];

  const templates = [
    {
      id: 'ats',
      name: 'ATS Professional',
      description: 'Optimized for Applicant Tracking Systems with clean formatting and keyword optimization',
      category: 'ATS Optimized',
      preview: '/templates/ats-preview.png',
      rating: 4.9,
      downloads: 15420,
      favorites: 2340,
      features: ['ATS Compatible', 'Professional Layout', 'Keyword Optimized', 'Clean Typography'],
      color: 'from-blue-500 to-blue-600',
      isPremium: false,
      industry: 'General',
      lastUpdated: '2024-01-15',
      compatibility: ['PDF', 'Word', 'Google Docs'],
      tags: ['professional', 'ats-friendly', 'clean', 'modern']
    },
    {
      id: 'modern',
      name: 'Modern Executive',
      description: 'Contemporary design with bold typography and visual hierarchy perfect for leadership roles',
      category: 'Modern',
      preview: '/templates/modern-preview.png',
      rating: 4.8,
      downloads: 12350,
      favorites: 1890,
      features: ['Modern Design', 'Visual Impact', 'Leadership Focus', 'Bold Typography'],
      color: 'from-purple-500 to-purple-600',
      isPremium: true,
      industry: 'Executive',
      lastUpdated: '2024-01-10',
      compatibility: ['PDF', 'Word'],
      tags: ['executive', 'modern', 'bold', 'leadership']
    },
    {
      id: 'classic',
      name: 'Classic Professional',
      description: 'Timeless design that works for any industry and career level with traditional formatting',
      category: 'Professional',
      preview: '/templates/classic-preview.png',
      rating: 4.7,
      downloads: 18200,
      favorites: 3200,
      features: ['Industry Standard', 'Clean Typography', 'Versatile', 'Traditional Layout'],
      color: 'from-green-500 to-green-600',
      isPremium: false,
      industry: 'General',
      lastUpdated: '2024-01-08',
      compatibility: ['PDF', 'Word', 'Google Docs'],
      tags: ['classic', 'professional', 'versatile', 'traditional']
    },
    {
      id: 'creative',
      name: 'Creative Portfolio',
      description: 'Perfect for designers, artists, and creative professionals with visual portfolio elements',
      category: 'Creative',
      preview: '/templates/creative-preview.png',
      rating: 4.6,
      downloads: 8900,
      favorites: 1450,
      features: ['Visual Portfolio', 'Creative Elements', 'Showcase Skills', 'Unique Design'],
      color: 'from-pink-500 to-pink-600',
      isPremium: true,
      industry: 'Creative',
      lastUpdated: '2024-01-12',
      compatibility: ['PDF', 'Word'],
      tags: ['creative', 'portfolio', 'design', 'visual']
    },
    {
      id: 'minimalist',
      name: 'Minimalist Clean',
      description: 'Clean, simple design that focuses on content over decoration with ample white space',
      category: 'Minimalist',
      preview: '/templates/minimalist-preview.png',
      rating: 4.8,
      downloads: 11700,
      favorites: 2100,
      features: ['Clean Layout', 'Content Focus', 'Ample White Space', 'Simple Typography'],
      color: 'from-gray-500 to-gray-600',
      isPremium: false,
      industry: 'General',
      lastUpdated: '2024-01-05',
      compatibility: ['PDF', 'Word', 'Google Docs'],
      tags: ['minimalist', 'clean', 'simple', 'content-focused']
    },
    {
      id: 'executive',
      name: 'Executive Leadership',
      description: 'Premium design for C-level executives and senior leaders with sophisticated styling',
      category: 'Executive',
      preview: '/templates/executive-preview.png',
      rating: 4.9,
      downloads: 5600,
      favorites: 980,
      features: ['Executive Style', 'Premium Look', 'Leadership Focus', 'Sophisticated Design'],
      color: 'from-yellow-500 to-yellow-600',
      isPremium: true,
      industry: 'Executive',
      lastUpdated: '2024-01-18',
      compatibility: ['PDF', 'Word'],
      tags: ['executive', 'premium', 'leadership', 'sophisticated']
    },
    {
      id: 'academic',
      name: 'Academic Research',
      description: 'Designed for researchers, professors, and academic professionals with publication sections',
      category: 'Academic',
      preview: '/templates/academic-preview.png',
      rating: 4.7,
      downloads: 7200,
      favorites: 1200,
      features: ['Publication Section', 'Research Focus', 'Academic Format', 'Citation Ready'],
      color: 'from-indigo-500 to-indigo-600',
      isPremium: false,
      industry: 'Academic',
      lastUpdated: '2024-01-20',
      compatibility: ['PDF', 'Word', 'LaTeX'],
      tags: ['academic', 'research', 'publications', 'education']
    },
    {
      id: 'technical',
      name: 'Technical Specialist',
      description: 'Perfect for software engineers, IT professionals, and technical specialists',
      category: 'Technical',
      preview: '/templates/technical-preview.png',
      rating: 4.8,
      downloads: 9800,
      favorites: 1650,
      features: ['Technical Skills', 'Code Examples', 'Project Portfolio', 'Certifications'],
      color: 'from-cyan-500 to-cyan-600',
      isPremium: false,
      industry: 'Technology',
      lastUpdated: '2024-01-14',
      compatibility: ['PDF', 'Word', 'Google Docs'],
      tags: ['technical', 'engineering', 'it', 'programming']
    },
    {
      id: 'startup',
      name: 'Startup Innovator',
      description: 'Dynamic design for entrepreneurs and startup professionals with innovation focus',
      category: 'Startup',
      preview: '/templates/startup-preview.png',
      rating: 4.6,
      downloads: 6400,
      favorites: 1100,
      features: ['Innovation Focus', 'Dynamic Layout', 'Startup Experience', 'Growth Metrics'],
      color: 'from-orange-500 to-orange-600',
      isPremium: true,
      industry: 'Startup',
      lastUpdated: '2024-01-16',
      compatibility: ['PDF', 'Word'],
      tags: ['startup', 'entrepreneur', 'innovation', 'growth']
    }
  ];

  const filteredAndSortedTemplates = templates
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'newest':
          return new Date(b.lastUpdated || '2024-01-01').getTime() - new Date(a.lastUpdated || '2024-01-01').getTime();
        case 'popular':
        default:
          return (b.favorites || 0) - (a.favorites || 0);
      }
    });

  const handleSelectTemplate = (templateId: string) => {
    setTemplate(templateId as any);
    navigateToState('editing');
  };

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handlePreviewTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400'
        }`}
      />
    ));
  };

  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'Technology': return <Code className="w-4 h-4" />;
      case 'Creative': return <Palette className="w-4 h-4" />;
      case 'Academic': return <GraduationCap className="w-4 h-4" />;
      case 'Executive': return <Briefcase className="w-4 h-4" />;
      case 'Startup': return <Zap className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-slide-in-bottom">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Professional Templates 🎨
            </h1>
            <p className="text-white/60">
              Choose from {templates.length} professionally designed templates optimized for different industries and career levels
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="btn-glass border-none hover:bg-white/10"
            >
              {viewMode === 'grid' ? (
                <List className="w-4 h-4 text-white" />
              ) : (
                <Grid className="w-4 h-4 text-white" />
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all" onClick={() => setSelectedCategory('All')}>
              All Templates ({templates.length})
            </TabsTrigger>
            <TabsTrigger value="free" onClick={() => setSelectedCategory('All')}>
              Free Templates ({templates.filter(t => !t.isPremium).length})
            </TabsTrigger>
            <TabsTrigger value="premium" onClick={() => setSelectedCategory('All')}>
              Premium Templates ({templates.filter(t => t.isPremium).length})
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                placeholder="Search templates by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-glass pl-10"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="btn-glass border-none bg-white/10 text-white rounded-lg px-3 py-2"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="downloads">Most Downloaded</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.slice(1).map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`btn-glass border-none px-3 py-1 text-xs ${
                  selectedCategory === category
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-white/60'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </Tabs>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{templates.length}</p>
                <p className="text-xs text-white/60">Total Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {templates.reduce((acc, t) => acc + t.downloads, 0).toLocaleString()}
                </p>
                <p className="text-xs text-white/60">Total Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {(templates.reduce((acc, t) => acc + t.rating, 0) / templates.length).toFixed(1)}
                </p>
                <p className="text-xs text-white/60">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {templates.reduce((acc, t) => acc + (t.favorites || 0), 0).toLocaleString()}
                </p>
                <p className="text-xs text-white/60">Total Favorites</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates Grid/List */}
      <div className={`
        ${viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }
      `}>
        {filteredAndSortedTemplates.map((template) => (
          <div
            key={template.id}
            className={`glass-card hover:scale-105 transition-all duration-300 ${
              viewMode === 'grid' ? 'p-6' : 'p-4 flex items-center gap-6'
            }`}
          >
            {/* Template Preview */}
            <div className={`
              ${viewMode === 'grid' ? 'mb-4' : 'w-32 h-40 flex-shrink-0'}
              relative rounded-xl overflow-hidden bg-gradient-to-br ${template.color}
            `}>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Layout className="w-12 h-12 text-white/80" />
              </div>

              {template.isPremium && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                  PRO
                </div>
              )}

              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(template.rating)}
                </div>
                <span className="text-white/80 text-xs">{template.rating}</span>
              </div>

              <button
                onClick={() => toggleFavorite(template.id)}
                className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(template.id)
                      ? 'text-red-500 fill-current'
                      : 'text-white/60'
                  }`}
                />
              </button>
            </div>

            {/* Template Info */}
            <div className={`${viewMode === 'grid' ? '' : 'flex-1'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-white/60 mb-2 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Industry and Category */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {getIndustryIcon(template.industry || 'General')}
                      <span className="ml-1">{template.industry || 'General'}</span>
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-4">
                {template.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {template.features.length > 3 && (
                  <span className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full">
                    +{template.features.length - 3} more
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                <span className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {template.downloads.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {template.favorites || 0}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {template.compatibility?.length || 0} formats
                </span>
              </div>

              {/* Compatibility */}
              <div className="flex items-center gap-1 mb-4">
                {template.compatibility?.map((format) => (
                  <Badge key={format} variant="outline" className="text-xs px-1 py-0">
                    {format}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="btn-gradient flex-1"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Use Template
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="btn-glass border-none hover:bg-white/10"
                  onClick={() => handlePreviewTemplate(template.id)}
                >
                  <Eye className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="btn-glass border-none hover:bg-white/10"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedTemplates.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Layout className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No templates found
          </h3>
          <p className="text-white/60 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSortBy('popular');
            }}
            className="btn-gradient"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="glass-card p-6 text-center">
        <h2 className="text-xl font-semibold text-white mb-2">
          Need a Custom Template?
        </h2>
        <p className="text-white/60 mb-4">
          Our AI can help you create a custom template based on your industry and preferences
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="btn-gradient">
            Create Custom Template
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="btn-glass border-white/20 text-white hover:bg-white/10">
            <BookOpen className="w-4 h-4 mr-2" />
            Template Guide
          </Button>
        </div>
      </div>
    </div>
  );
}
