
'use client';

import React, { useState } from 'react';
import { 
  Layout, 
  Eye, 
  Download,
  Star,
  Check,
  ArrowRight,
  Search,
  Grid,
  List
} from 'lucide-react';
import { useAppContext } from '@/contexts/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Templates() {
  const { navigateToState, setTemplate } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    'All',
    'ATS Optimized',
    'Creative',
    'Professional',
    'Modern',
    'Minimalist',
    'Executive'
  ];

  const templates = [
    {
      id: 'ats',
      name: 'ATS Professional',
      description: 'Optimized for Applicant Tracking Systems with clean formatting',
      category: 'ATS Optimized',
      preview: '/templates/ats-preview.png',
      rating: 4.9,
      downloads: 15420,
      features: ['ATS Compatible', 'Professional Layout', 'Easy to Customize'],
      color: 'from-blue-500 to-blue-600',
      isPremium: false
    },
    {
      id: 'modern',
      name: 'Modern Executive',
      description: 'Contemporary design with bold typography and visual hierarchy',
      category: 'Modern',
      preview: '/templates/modern-preview.png',
      rating: 4.8,
      downloads: 12350,
      features: ['Modern Design', 'Visual Impact', 'Creative Layout'],
      color: 'from-purple-500 to-purple-600',
      isPremium: true
    },
    {
      id: 'classic',
      name: 'Classic Professional',
      description: 'Timeless design that works for any industry and career level',
      category: 'Professional',
      preview: '/templates/classic-preview.png',
      rating: 4.7,
      downloads: 18200,
      features: ['Industry Standard', 'Clean Typography', 'Versatile'],
      color: 'from-green-500 to-green-600',
      isPremium: false
    },
    {
      id: 'creative',
      name: 'Creative Portfolio',
      description: 'Perfect for designers, artists, and creative professionals',
      category: 'Creative',
      preview: '/templates/creative-preview.png',
      rating: 4.6,
      downloads: 8900,
      features: ['Visual Portfolio', 'Creative Elements', 'Showcase Skills'],
      color: 'from-pink-500 to-pink-600',
      isPremium: true
    },
    {
      id: 'minimalist',
      name: 'Minimalist Clean',
      description: 'Clean, simple design that focuses on content over decoration',
      category: 'Minimalist',
      preview: '/templates/minimal-preview.png',
      rating: 4.8,
      downloads: 11700,
      features: ['Clean Layout', 'Content Focus', 'Easy Reading'],
      color: 'from-gray-500 to-gray-600',
      isPremium: false
    },
    {
      id: 'executive',
      name: 'Executive Leadership',
      description: 'Premium design for C-level executives and senior leaders',
      category: 'Executive',
      preview: '/templates/executive-preview.png',
      rating: 4.9,
      downloads: 5600,
      features: ['Executive Style', 'Premium Look', 'Leadership Focus'],
      color: 'from-yellow-500 to-yellow-600',
      isPremium: true
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (templateId: string) => {
    setTemplate(templateId as any);
    navigateToState('editing');
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

  return (
    <div className="space-y-8 animate-slide-in-bottom">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Choose Your Template 🎨
            </h1>
            <p className="text-white/60">
              Select from our professionally designed templates optimized for success
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

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glass pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`btn-glass border-none ${
                  selectedCategory === category
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-white/60'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid/List */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }
      `}>
        {filteredTemplates.map((template) => (
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
            </div>

            {/* Template Info */}
            <div className={`${viewMode === 'grid' ? '' : 'flex-1'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-white/60 mb-2">
                    {template.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-4">
                {template.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                <span className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {template.downloads.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {template.rating}
                </span>
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
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
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
            }}
            className="btn-gradient"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="glass-card p-6 text-center">
        <h2 className="text-xl font-semibold text-white mb-2">
          Can&apos;t find the perfect template?
        </h2>
        <p className="text-white/60 mb-4">
          Our AI can help you create a custom template based on your industry and preferences
        </p>
        <Button className="btn-gradient">
          Create Custom Template
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
