
// ExampleDetailPage displays a detailed view of a specific resume example.
// It selects the correct template and renders the resume data for the given slug.
import { AppHeader } from '@/components/app-header';
import { AtsTemplate } from '@/components/templates/ats';
import { ModernTemplate } from '@/components/templates/modern';
import { resumeExamples } from '@/lib/example-data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto pt-24 px-4">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold">{example.title} Example</h1>
                <p className="text-muted-foreground">{example.description}</p>
            </div>
            <Link href="/">
                <Button>Create My Resume</Button>
            </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {renderTemplate()}
        </div>
        
      </main>
    </div>
  );
}

// Optional: Generate static pages for each example for better performance
export async function generateStaticParams() {
  return resumeExamples.map(example => ({
    slug: example.slug,
  }));
}
