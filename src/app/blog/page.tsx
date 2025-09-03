
// BlogPage displays career advice articles from our expert team.
// Each article provides valuable insights for job seekers and career professionals.
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/app-context';
import { useEffect } from 'react';

// Enhanced blog data with more professional content
const blogPosts = [
  {
    title: "10 ATS-Friendly Resume Tips That Actually Work",
    summary: "Learn how to optimize your resume for Applicant Tracking Systems without sacrificing readability.",
    author: "Sarah Johnson",
    publishedAt: "2024-01-15",
    category: "Resume Tips",
    readTime: "5 min read",
    link: "#"
  },
  {
    title: "The Psychology of Hiring: What Recruiters Really Look For",
    summary: "Understand the mindset of hiring managers and what makes a resume stand out in a pile of applications.",
    author: "Michael Chen",
    publishedAt: "2024-01-12",
    category: "Career Advice",
    readTime: "7 min read",
    link: "#"
  },
  {
    title: "Remote Work Resume: How to Showcase Virtual Collaboration Skills",
    summary: "Position yourself as a remote work expert with these proven resume strategies.",
    author: "Emma Davis",
    publishedAt: "2024-01-10", 
    category: "Remote Work",
    readTime: "4 min read",
    link: "#"
  },
  {
    title: "Career Change Resume: Making a Successful Transition",
    summary: "Navigate career pivots with confidence using these expert-backed resume techniques.",
    author: "David Rodriguez",
    publishedAt: "2024-01-08",
    category: "Career Change",
    readTime: "6 min read",
    link: "#"
  },
  {
    title: "Industry-Specific Resume Formats: Tech vs Finance vs Healthcare",
    summary: "Discover the unique resume requirements for different industries and how to tailor your approach.",
    author: "Lisa Park",
    publishedAt: "2024-01-05",
    category: "Industry Insights",
    readTime: "8 min read",
    link: "#"
  },
  {
    title: "The Future of Resumes: AI, Video, and Interactive Formats",
    summary: "Explore emerging resume trends and how to stay ahead of the curve in job applications.",
    author: "Alex Thompson",
    publishedAt: "2024-01-03",
    category: "Future Trends",
    readTime: "5 min read",
    link: "#"
  }
];

// Main page component for /blog route.
export default function BlogPage() {
  const { setState } = useAppContext();

  useEffect(() => {
    setState('landing'); // Set to appropriate state or remove if not needed
  }, [setState]);

  return (
    <div className="glass-container p-8">
      {/* Page title and description */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-enterprise-text animate-slide-in-from-top">
          Career Advice Blog
        </h1>
        <p className="text-lg text-enterprise-text/80 max-w-3xl mx-auto">
          Expert insights, tips, and strategies to accelerate your career success.
        </p>
      </div>

      {/* Blog post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <Card 
            key={index} 
            className="glass-card hover:scale-[1.02] transition-all duration-300 animate-fade-in-up cursor-pointer group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="glass-badge text-xs">
                  {post.category}
                </Badge>
                <span className="text-xs text-enterprise-text/60">{post.readTime}</span>
              </div>
              <CardTitle className="text-lg text-enterprise-text group-hover:text-enterprise-primary transition-colors">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-enterprise-text/70 mb-4 text-sm leading-relaxed">
                {post.summary}
              </p>
              <div className="flex justify-between items-center">
                <div className="text-xs text-enterprise-text/60">
                  <span>By {post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.publishedAt}</span>
                </div>
                <a 
                  href={post.link} 
                  className="text-enterprise-primary font-semibold hover:text-enterprise-accent transition-colors text-sm group-hover:translate-x-1 inline-flex items-center"
                >
                  Read More 
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to action section */}
      <div className="mt-16 text-center">
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-enterprise-text mb-4">
            Ready to Create Your Perfect Resume?
          </h2>
          <p className="text-enterprise-text/70 mb-6">
            Apply these expert tips with our AI-powered resume builder and land your dream job.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-primary"
          >
            Start Building Now
          </button>
        </div>
      </div>
    </div>
  );
}
