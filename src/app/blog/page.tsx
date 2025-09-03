
// BlogPage displays a list of career advice blog posts for users.
// It uses the AppHeader for navigation and Card components for each blog post.
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Static array of blog post data. Each post contains a title, summary, and link.
const blogPosts = [
  {
    title: '5 Tips for Crafting the Perfect Resume',
    summary: 'Learn how to make your resume stand out from the competition with these essential tips.',
    link: '#',
  },
  {
    title: 'How to Ace Your Next Job Interview',
    summary: 'Discover the secrets to a successful interview, from preparation to follow-up.',
    link: '#',
  },
  {
    title: 'The Importance of a Strong Cover Letter',
    summary: 'Find out why a well-written cover letter is crucial for your job application.',
    link: '#',
  },
];

// Main blog page component for the /blog route.
export default function BlogPage() {
  // Render the blog UI with header and a grid of blog post cards.
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="container mx-auto py-24 px-4">
        {/* Page title */}
        <h1 className="text-4xl font-bold text-center mb-12 animate-slide-in-from-top">Career Advice Blog</h1>
        {/* Blog post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.summary}</p>
                <a href={post.link} className="text-primary font-semibold hover:underline">
                  Read More &rarr;
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
