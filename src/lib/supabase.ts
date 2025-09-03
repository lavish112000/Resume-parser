import { createClient as createBrowserClient } from '@/utils/supabase/client'

// Browser client for client-side operations
export const supabase = createBrowserClient()

// Server client for server-side operations (lazy loaded to avoid server-only imports in client)
export const createServerSupabaseClient = async () => {
  const { createClient } = await import('@/utils/supabase/server')
  return await createClient()
}

// Legacy export for backward compatibility
export { supabase as default }

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          title: string
          data: any
          template: string
          style_options: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          data: any
          template: string
          style_options: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          data?: any
          template?: string
          style_options?: any
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
