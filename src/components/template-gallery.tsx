'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  Star, 
  Download, 
  Eye, 
  Search, 
  Filter,
  Palette,
  Briefcase,
  GraduationCap,
  Code,
  Heart
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  downloads: number;
  isPremium: boolean;
  previewImage: string;
  tags: string[];
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Modern Professional',
    category: 'Professional',
    description: 'Clean, modern design perfect for tech and business roles',
    rating: 4.8,
    downloads: 12453,
    isPremium: false,
    previewImage: '/templates/modern.jpg',
    tags: ['ATS-Friendly', 'Clean', 'Modern']
  },
  {
    id: '2',
    name: 'Classic Executive',
    category: 'Executive',
    description: 'Traditional layout ideal for senior positions',
    rating: 4.9,
    downloads: 8901,
    isPremium: true,
    previewImage: '/templates/classic.jpg',
    tags: ['Traditional', 'Executive', 'Formal']
  },
  {
    id: '3',
    name: 'Creative Designer',
    category: 'Creative',
    description: 'Showcase your creativity with this unique design',
    rating: 4.7,
    downloads: 5432,
    isPremium: true,
    previewImage: '/templates/creative.jpg',
    tags: ['Creative', 'Colorful', 'Unique']
  },
  {
    id: '4',
    name: 'ATS Optimized',
    category: 'ATS',
    description: 'Specifically designed to pass ATS screening',
    rating: 4.9,
    downloads: 15678,
    isPremium: false,
    previewImage: '/templates/ats.jpg',
    tags: ['ATS-Optimized', 'Simple', 'Text-Based']
  },
  {
    id: '5',
    name: 'Tech Specialist',
    category: 'Technology',
    description: 'Perfect for developers and IT professionals',
    rating: 4.8,
    downloads: 9876,
    isPremium: false,
    previewImage: '/templates/tech.jpg',
    tags: ['Tech', 'Developer', 'Modern']
  },
  {
    id: '6',
    name: 'Academic Scholar',
    category: 'Academic',
    description: 'Designed for academic and research positions',
    rating: 4.6,
    downloads: 3456,
    isPremium: true,
    previewImage: '/templates/academic.jpg',
    tags: ['Academic', 'Research', 'Detailed']
  }
];

const categories = [
  { name: 'All', icon: FileText, count: templates.length },
  { name: 'Professional', icon: Briefcase, count: templates.filter(t => t.category === 'Professional').length },
  { name: 'Creative', icon: Palette, count: templates.filter(t => t.category === 'Creative').length },
  { name: 'Technology', icon: Code, count: templates.filter(t => t.category === 'Technology').length },
  { name: 'Academic', icon: GraduationCap, count: templates.filter(t => t.category === 'Academic').length },
];

export function TemplateGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Resume Templates</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose from our collection of professionally designed, ATS-optimized resume templates
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.name)}
                  className="whitespace-nowrap"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {category.name} ({category.count})
                </Button>
              );
            })}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="h-20 w-20 text-slate-400" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  {template.isPremium ? (
                    <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                      Premium
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Free</Badge>
                  )}
                </div>

                <p className="text-sm text-slate-600 mb-3">{template.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{template.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => setSelectedTemplate(template)}
                  >
                    Use Template
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No templates found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Template Preview Dialog */}
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedTemplate?.name}</span>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button>
                    Use Template
                  </Button>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-32 w-32 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Template preview would appear here</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
