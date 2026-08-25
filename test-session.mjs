import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.vercel.prod', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=').map(s => s.replace(/^"|"$/g, '').replace(/\\n/g, ''))));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const email = `test_session_${Date.now()}@example.com`;
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'password123',
  });
  console.log('Session present?', !!data.session);
  console.log('User present?', !!data.user);
  console.log('Email confirmed at?', data.user?.email_confirmed_at);
}
run();
