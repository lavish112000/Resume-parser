
import { AppHeader } from '@/components/app-header';
import { ModernTemplate } from '@/components/templates/modern';
import { resumeExamples } from '@/lib/example-data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ExampleDetailPage({ params }: { params: { slug: string } }) {
  const example = resumeExamples.find(e => e.slug === params.slug);

  if (!example) {
    notFound();
  }

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
            <ModernTemplate data={example.data} styleOptions={{
                fontFamily: 'Inter',
                fontSize: '11pt',
                color: '#5DADE2',
                margin: '1.5cm'
            }} />
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
