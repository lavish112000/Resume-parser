
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <AppHeader />
      <main className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Career Advice Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
                <a href={post.link} className="text-primary font-semibold mt-4 inline-block">
                  Read More
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
