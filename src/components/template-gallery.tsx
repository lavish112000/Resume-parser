
"use client";

// TemplateGallery displays all available resume templates for selection.
// Includes search, category filters, featured templates, and preview dialog.
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useTemplateContext } from '@/context/TemplateContext';
import { mapToAppTemplateFromName } from '@/lib/template-utils';
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

// Local gallery template shape (kept separate from app Template union)
interface GalleryTemplate {
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

// Demo template data for gallery display.
const templates: GalleryTemplate[] = [
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
  const router = useRouter();
  const { toast } = useToast();
  const { setTemplate, setStyleOptions, requestOpenEditor, favorites, toggleFavorite } = useTemplateContext();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<GalleryTemplate | null>(null);

  // Map a gallery template to the app Template union used by the editor.
  const mapToAppTemplate = (t: GalleryTemplate) => mapToAppTemplateFromName(t.name, t.tags);

  // Apply the template: set context state and navigate to home.
  const applyTemplate = (t: GalleryTemplate) => {
    try {
      const appTemplate = mapToAppTemplate(t);
      setTemplate(appTemplate);
      // set some sensible style defaults for chosen template
      if (appTemplate === 'ats') {
        setStyleOptions({ ...{ fontFamily: 'Arial, sans-serif', fontSize: '11pt', color: '#000000', margin: '1.5cm', lineHeight: '1.4', skillSpacing: '0.5rem' } });
      } else if (appTemplate === 'classic') {
        setStyleOptions({ ...{ fontFamily: 'Georgia', fontSize: '11pt', color: '#1f2937', margin: '1.5cm', lineHeight: '1.45', skillSpacing: '0.5rem' } });
      } else {
        setStyleOptions({ ...{ fontFamily: 'Inter', fontSize: '11pt', color: '#5DADE2', margin: '1.5cm', lineHeight: '1.4', skillSpacing: '0.5rem' } });
      }
      requestOpenEditor();
      toast({ title: 'Template applied', description: `Opening editor with "${t.name}"` });
      router.push('/');
    } catch (err) {
      console.error('Failed to apply template', err);
      toast({ variant: 'destructive', title: 'Could not apply template', description: 'Please try again.' });
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Featured templates (top 2 by rating)
  const featuredTemplates = [...templates].sort((a, b) => b.rating - a.rating).slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Immersive Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-gradientShift">Choose Your Template</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in-up">
            Select a resume style that fits your personality and career goals. Preview, favorite, and instantly apply any template!
          </p>
        </div>

        {/* Featured Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">🌟 Featured Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredTemplates.map((template) => (
              <Card key={template.id} className="border-2 border-emerald-400/40 bg-gradient-to-br from-white to-emerald-50 shadow-xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="aspect-[3/4] rounded-lg mb-4 relative overflow-hidden">
                    <img src={template.previewImage} alt={template.name} className="object-cover w-full h-full rounded-lg group-hover:brightness-90 transition duration-300" />
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
                    <CardTitle className="text-lg font-bold text-emerald-700">{template.name}</CardTitle>
                    {template.isPremium ? (
                      <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">Premium</Badge>
                    ) : (
                      <Badge variant="secondary">Free</Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
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
                    <Button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md hover:shadow-xl" onClick={() => applyTemplate(template)}>Use Template</Button>
                    <Button variant={favorites.includes(template.id) ? 'default' : 'outline'} size="icon" onClick={() => toggleFavorite(template.id)}>
                      <Heart className={`h-4 w-4 ${favorites.includes(template.id) ? 'text-pink-500 fill-pink-400' : ''}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
            <Card key={template.id} className={`hover:shadow-2xl transition-all duration-300 cursor-pointer group ${selectedTemplate?.id === template.id ? 'border-4 border-blue-500 bg-gradient-to-br from-blue-50 to-white scale-[1.03]' : ''}`}>
              <CardHeader className="pb-3">
                <div className="aspect-[3/4] rounded-lg mb-4 relative overflow-hidden">
                  <img src={template.previewImage} alt={template.name} className="object-cover w-full h-full rounded-lg group-hover:brightness-90 transition duration-300" />
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
                  <CardTitle className="text-lg font-bold text-blue-700">{template.name}</CardTitle>
                  {template.isPremium ? (
                    <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">Premium</Badge>
                  ) : (
                    <Badge variant="secondary">Free</Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
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
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:shadow-xl" onClick={() => applyTemplate(template)}>Use Template</Button>
                  <Button variant={favorites.includes(template.id) ? 'default' : 'outline'} size="icon" onClick={() => toggleFavorite(template.id)}>
                    <Heart className={`h-4 w-4 ${favorites.includes(template.id) ? 'text-pink-500 fill-pink-400' : ''}`} />
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
          <DialogContent className="max-w-4xl h-[80vh] animate-fade-in-up">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{selectedTemplate?.name}</span>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white" onClick={() => selectedTemplate && applyTemplate(selectedTemplate)}>Use Template</Button>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <img src={selectedTemplate?.previewImage} alt={selectedTemplate?.name} className="object-cover w-64 h-80 rounded-lg mx-auto mb-4 shadow-lg animate-scale-in" />
                <p className="text-slate-600">This is a live preview of your selected template. All your resume data will be styled accordingly!</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
