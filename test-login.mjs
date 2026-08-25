import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.vercel.prod', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=').map(s => s.replace(/^"|"$/g, '').replace(/\\n/g, ''))));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const email = `test_login_${Date.now()}@example.com`;
  await supabase.auth.signUp({ email, password: 'password123' });
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: 'password123' });
  console.log('Login error:', error?.message);
  console.log('Session present?', !!data?.session);
}
run();
