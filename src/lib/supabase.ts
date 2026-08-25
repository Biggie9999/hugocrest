import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Disable locks to prevent Chrome navigator.locks from freezing the session promise
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    lock: (name, acquireTimeout, fn) => {
      // Bypass the Web Locks API entirely. This fixes the Chrome hanging issue 
      // where getSession() waits forever for a corrupted tab lock.
      return fn();
    }
  }
});
