
// ExamplesPage displays a grid of professional resume examples for inspiration.
// Each example links to a detailed view by slug.
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { resumeExamples } from '@/lib/example-data';
import Link from 'next/link';

// Main page component for /examples route.
export default function ExamplesPage() {
  // Render the examples grid UI.
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="container mx-auto py-24 px-4">
        {/* Page title and description */}
        <h1 className="text-4xl font-bold text-center mb-12 animate-slide-in-from-top">Resume Examples</h1>
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Get inspired by our collection of professional resume examples.
        </p>
        {/* Example cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumeExamples.map((example, index) => (
            <Link href={`/examples/${example.slug}`} key={index}>
              <Card 
                className="hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{example.description}</p>
                   <p className="text-primary font-semibold hover:underline">
                    View Example &rarr;
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
