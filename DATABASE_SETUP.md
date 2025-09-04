# Database Integration Setup Guide

This guide will help you set up database integration for your ResumeForge application using Supabase.

## 🚀 Quick Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be fully initialized

### 2. Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials from the project dashboard:
   - Project URL: `https://your-project-id.supabase.co`
   - Anon Key: Found in Settings > API

### 3. Create Database Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resumes table
CREATE TABLE resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  data JSONB NOT NULL,
  template TEXT NOT NULL DEFAULT 'modern',
  style_options JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for resumes table
CREATE POLICY "Users can view own resumes" ON resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resumes" ON resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes" ON resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes" ON resumes
  FOR DELETE USING (auth.uid() = user_id);
```

### 4. Test the Integration

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Visit the authentication page:
   - `http://localhost:3000/auth`

3. Create an account and test the database functionality

## 📁 Files Created/Modified

### New Files

- `src/lib/supabase.ts` - Supabase client configuration
- `src/lib/database.ts` - Database service layer
- `src/contexts/auth-context.tsx` - Authentication context
- `src/app/actions/database-actions.ts` - Server actions for database operations
- `src/app/database-dashboard/page.tsx` - Database-connected dashboard
- `src/app/auth/page.tsx` - Authentication page
- `.env.example` - Environment variables template

### Modified Files

- `src/app/layout.tsx` - Added AuthProvider wrapper
- `package.json` - Added Supabase dependency

## 🔧 Integration Features

### What's Included

1. **User Authentication**
   - Sign up/Sign in with email and password
   - Session management
   - Protected routes

2. **Resume Storage**
   - Save resumes to database
   - Load user's saved resumes
   - Update existing resumes
   - Delete resumes

3. **Dashboard**
   - View all saved resumes
   - Resume management (edit, download, delete)
   - Template information display

4. **Security**
   - Row Level Security (RLS) enabled
   - User-specific data isolation
   - Secure server actions

## 🎯 Usage Examples

### Save a Resume

```typescript
import { saveResumeToDatabase } from '@/app/actions/database-actions'

const result = await saveResumeToDatabase(
  userId,
  'My Resume',
  resumeData,
  'modern',
  styleOptions
)
```

### Load User Resumes

```typescript
import { getUserResumesFromDatabase } from '@/app/actions/database-actions'

const result = await getUserResumesFromDatabase(userId)
if (result.success) {
  setResumes(result.resumes)
}
```

### Authentication

```typescript
import { useAuth } from '@/contexts/auth-context'

const { user, signIn, signUp, signOut } = useAuth()
```

## 🚀 Next Steps

1. **Set up Supabase project** and configure environment variables
2. **Test authentication flow** at `/auth`
3. **Test resume saving** by creating and saving a resume
4. **Customize the dashboard** to fit your design needs
5. **Add more features** like resume sharing, templates, etc.

## 🔍 Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Make sure `.env.local` exists and is properly formatted
   - Restart the development server after adding env vars

2. **Database connection errors**
   - Verify Supabase URL and keys are correct
   - Check if Supabase project is active

3. **Authentication not working**
   - Ensure RLS policies are correctly set up
   - Check Supabase authentication settings

### Debug Commands

```bash
# Check environment variables
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)

# Test database connection
import { supabase } from '@/lib/supabase'
const { data, error } = await supabase.from('users').select('*')
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🚀 SSR (Server-Side Rendering) Updates

Your application has been upgraded to use Supabase's SSR approach for better security and performance.

### New Files Added

```text
src/utils/supabase/
├── server.ts          # Server-side Supabase client
├── client.ts          # Client-side Supabase client
└── middleware.ts      # Auth middleware
middleware.ts          # Next.js middleware
src/app/supabase-example/page.tsx  # SSR example
```

### Key Improvements

1. **Server-Side Security**: Database operations run securely on the server
2. **Automatic Session Refresh**: Middleware handles session management
3. **Route Protection**: Automatic redirects for authenticated/unauthenticated users
4. **Better Performance**: Server components can access data without client-side requests

### Usage Examples

**Server Component:**

```typescript
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: resumes } = await supabase.from('resumes').select('*')

  return <div>{/* Your JSX */}</div>
}
```

**Client Component:**

```typescript
import { supabase } from '@/lib/supabase' // Still works for client-side
```

**Server Actions:**

```typescript
'use server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function saveResume(data) {
  const supabase = await createServerSupabaseClient()
  // Secure server-side operation
}
```

### Test the SSR Features

- Visit `http://localhost:3000/supabase-example` to see SSR in action
- The middleware automatically protects routes and manages sessions

---

🎉 **Congratulations!** Your ResumeForge application now has enterprise-grade database integration with SSR support, user authentication, and secure resume storage capabilities.
