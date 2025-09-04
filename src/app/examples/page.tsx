
// ExamplesPage displays a grid of professional resume examples for inspiration.
// Each example links to a detailed view by slug.
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { resumeExamples } from '@/lib/example-data';
import { useAppContext } from '@/contexts/app-context';
import Link from 'next/link';

// Main page component for /examples route.
export default function ExamplesPage() {
  const { setState } = useAppContext();

  // Note: Removed useEffect that was causing infinite loop
  // The app context already initializes with 'landing' state

  // Render the examples grid UI.
  return (
    <div className="glass-container p-8">
      {/* Page title and description */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-enterprise-text animate-slide-in-from-top">
          Resume Examples
        </h1>
        <p className="text-lg text-enterprise-text/80 mb-8 max-w-3xl mx-auto">
          Get inspired by our collection of professional resume examples crafted by industry experts.
        </p>
        
        {/* Stats section */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-enterprise-primary">{resumeExamples.length}+</div>
            <div className="text-sm text-enterprise-text/60">Professional Examples</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-enterprise-primary">15+</div>
            <div className="text-sm text-enterprise-text/60">Industries Covered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-enterprise-primary">ATS</div>
            <div className="text-sm text-enterprise-text/60">Optimized</div>
          </div>
        </div>
      </div>

      {/* Example cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumeExamples.map((example, index) => (
          <Link href={`/examples/${example.slug}`} key={index}>
            <Card 
              className="glass-card hover:scale-[1.02] transition-all duration-300 animate-fade-in-up cursor-pointer group h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="glass-badge text-xs">
                    {example.data?.experience?.[0]?.title || 'Professional'}
                  </Badge>
                  <Badge className="glass-badge-accent text-xs">
                    {example.template === 'ats' ? 'ATS Friendly' : 'Modern'}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-enterprise-text group-hover:text-enterprise-primary transition-colors">
                  {example.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex-grow">
                <p className="text-enterprise-text/70 mb-4 text-sm leading-relaxed">
                  {example.description}
                </p>
                
                {/* Preview stats */}
                <div className="space-y-2 mb-4">
                  {example.data?.experience && (
                    <div className="text-xs text-enterprise-text/60">
                      <span className="font-medium">Experience:</span> {example.data.experience.length} positions
                    </div>
                  )}
                  {example.data?.skills && (
                    <div className="text-xs text-enterprise-text/60">
                      <span className="font-medium">Skills:</span> {example.data.skills.length} listed
                    </div>
                  )}
                  {example.data?.education && (
                    <div className="text-xs text-enterprise-text/60">
                      <span className="font-medium">Education:</span> {example.data.education.length} degrees
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <span className="text-enterprise-primary font-semibold text-sm group-hover:text-enterprise-accent transition-colors group-hover:translate-x-1 inline-flex items-center">
                    View Example
                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Call to action section */}
      <div className="mt-16 text-center">
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-enterprise-text mb-4">
            Ready to Create Your Own Professional Resume?
          </h2>
          <p className="text-enterprise-text/70 mb-6">
            Use these examples as inspiration and create your personalized resume with our AI-powered builder.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="btn-primary"
            >
              Start Building
            </button>
            <button 
              onClick={() => window.location.href = '/templates'}
              className="btn-secondary"
            >
              Browse Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
