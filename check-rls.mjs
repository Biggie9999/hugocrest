import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.vercel.prod', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=').map(s => s.replace(/^"|"$/g, '').replace(/\\n/g, ''))));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  console.log("Checking login...");
  
  // We can simulate an authenticated session by using the admin API if we had the service_role key, 
  // but we only have anon.
  // Instead of logging in, maybe we can just query directly with anon key and see what it returns.
  
  const { data: profiles, error: pErr } = await supabase.from('profiles').select('*').eq('email', 'leonardcesar04231@gmail.com');
  console.log("Profiles with anon key:", profiles);
  
}
run();
