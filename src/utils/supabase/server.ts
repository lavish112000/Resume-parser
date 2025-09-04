import { createClient as createSupabaseClient } from '@supabase/supabase-js'

import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/dist/server/request/cookies';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = async (): Promise<SupabaseClient> => {
 const cookieStore = await cookies();

  // Create server client with cookie handling
  const supabase: SupabaseClient = createSupabaseClient(supabaseUrl!, supabaseKey!, {
    auth: {
      storage: {
        getItem: (key: string) => {
          const cookie = cookieStore.get(key);
          return cookie?.value ?? null;
        },
        setItem: (key: string, value: string) => {
          try {
            cookieStore.set(key, value, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 60 * 60 * 24 * 7 // 7 days
            });
          } catch {
            // Handle cookie setting errors
          }
        },
        removeItem: (key: string) => {
          try {
            cookieStore.delete(key);
          } catch {
            // Handle cookie deletion errors
          }
        }
      }
    }
  });

  return supabase;
};
