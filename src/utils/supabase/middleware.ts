import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from "next/server";
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = (request: NextRequest): { supabase: SupabaseClient; response: NextResponse } => {
  // Create an unmodified response
  const supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase: SupabaseClient = createSupabaseClient(
    supabaseUrl!,
    supabaseKey!,
    {
      auth: {
        storage: {
          getItem: (key: string) => {
            return request.cookies.get(key)?.value ?? null;
          },
          setItem: (key: string, value: string) => {
            request.cookies.set(key, value);
            supabaseResponse.cookies.set(key, value, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 60 * 60 * 24 * 7 // 7 days
            });
          },
          removeItem: (key: string) => {
            request.cookies.delete(key);
            supabaseResponse.cookies.delete(key);
          }
        }
      }
    },
  );

  return { supabase, response: supabaseResponse }
};
