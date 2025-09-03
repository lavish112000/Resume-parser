
// ExampleDetailPage displays a detailed view of a specific resume example.
// It selects the correct template and renders the resume data for the given slug.

import { AtsTemplate } from '@/components/templates/ats';
import { ModernTemplate } from '@/components/templates/modern';
import { resumeExamples } from '@/lib/example-data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

/**
 * Page component for viewing a single resume example by slug.
 * @param params - Route parameters containing the example slug.
 */
export default function ExampleDetailPage({ params }: { params: { slug: string } }) {
  // Find the example data by slug.
  const example = resumeExamples.find(e => e.slug === params.slug);

  // If not found, show 404.
  if (!example) {
    notFound();
  }

  /**
   * Renders the correct resume template based on example data.
   */
  const renderTemplate = () => {
      switch(example.template) {
        case 'ats':
            return <AtsTemplate data={example.data} styleOptions={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '11pt',
                color: '#000000',
                margin: '1.5cm',
                lineHeight: '1.6',
                skillSpacing: '0.5rem'
            }} />
        default:
             return <ModernTemplate data={example.data} styleOptions={{
                fontFamily: 'Inter',
                fontSize: '11pt',
                color: '#5DADE2',
                margin: '2cm',
                lineHeight: '1.6',
                skillSpacing: '0.5rem'
            }} />
      }
  }

  // Render the example detail page UI.
  return (
    <div className="glass-container p-8">
      {/* Header section */}
      <div className="glass-card p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-3">
              <Link href="/examples">
                <Button variant="outline" className="glass-button">
                  ← Back to Examples
                </Button>
              </Link>
              <Badge variant="secondary" className="glass-badge">
                {example.template === 'ats' ? 'ATS Friendly' : 'Modern Design'}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-enterprise-text mb-2">
              {example.title} Example
            </h1>
            <p className="text-enterprise-text/70 text-lg mb-4">
              {example.description}
            </p>
            
            {/* Resume stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {example.data?.experience && (
                <div className="text-center">
                  <div className="text-xl font-bold text-enterprise-primary">
                    {example.data.experience.length}
                  </div>
                  <div className="text-enterprise-text/60">Work Positions</div>
                </div>
              )}
              {example.data?.skills && (
                <div className="text-center">
                  <div className="text-xl font-bold text-enterprise-primary">
                    {example.data.skills.length}
                  </div>
                  <div className="text-enterprise-text/60">Skills Listed</div>
                </div>
              )}
              {example.data?.education && (
                <div className="text-center">
                  <div className="text-xl font-bold text-enterprise-primary">
                    {example.data.education.length}
                  </div>
                  <div className="text-enterprise-text/60">Education</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-xl font-bold text-enterprise-primary">ATS</div>
                <div className="text-enterprise-text/60">Optimized</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:w-auto">
            <Link href="/">
              <Button className="btn-primary w-full sm:w-auto">
                Create My Resume
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline" className="glass-button w-full sm:w-auto">
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Resume preview */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-enterprise-text">
            Resume Preview
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" className="glass-button text-sm">
              Download PDF
            </Button>
            <Button variant="outline" className="glass-button text-sm">
              Print
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-enterprise-border/20">
          <div className="transform origin-top scale-75 lg:scale-90 overflow-hidden">
            {renderTemplate()}
          </div>
        </div>
      </div>

      {/* Key features section */}
      <div className="mt-8">
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-enterprise-text mb-4">
            Why This Resume Works
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-enterprise-primary rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-enterprise-text">ATS Optimized</div>
                  <div className="text-sm text-enterprise-text/70">
                    Formatted to pass through Applicant Tracking Systems
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-enterprise-primary rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-enterprise-text">Clear Structure</div>
                  <div className="text-sm text-enterprise-text/70">
                    Easy to scan with logical information hierarchy
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-enterprise-primary rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-enterprise-text">Quantified Achievements</div>
                  <div className="text-sm text-enterprise-text/70">
                    Uses numbers and metrics to demonstrate impact
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-enterprise-primary rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-enterprise-text">Industry Keywords</div>
                  <div className="text-sm text-enterprise-text/70">
                    Includes relevant terms that recruiters look for
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-enterprise-primary rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-enterprise-text">Professional Design</div>
                  <div className="text-sm text-enterprise-text/70">
                    Clean, modern layout that stands out professionally
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-enterprise-primary rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-enterprise-text">Tailored Content</div>
                  <div className="text-sm text-enterprise-text/70">
                    Customized for specific role and industry requirements
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Optional: Generate static pages for each example for better performance
export async function generateStaticParams() {
  return resumeExamples.map(example => ({
    slug: example.slug,
  }));
}
