import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Page() {
  const supabase = await createClient()

  // Test query - this will work with proper Supabase setup
  const { data: user, error } = await supabase.auth.getUser()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Supabase SSR Test</h1>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error.message}</p>
          <p className="text-sm mt-2">
            Make sure your Supabase environment variables are set up correctly.
          </p>
        </div>
      ) : (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p>✅ SSR is working! Server-side Supabase client created successfully.</p>
          {user.user ? (
            <p className="mt-2">Logged in as: {user.user.email}</p>
          ) : (
            <p className="mt-2">Not logged in - this is expected for SSR testing.</p>
          )}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Available Routes:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><Link href="/auth" className="text-blue-600 hover:underline">/auth</Link> - Authentication</li>
          <li><Link href="/database-dashboard" className="text-blue-600 hover:underline">/database-dashboard</Link> - Resume Dashboard</li>
          <li><Link href="/" className="text-blue-600 hover:underline">/</Link> - Main Application</li>
        </ul>
      </div>
    </div>
  )
}
