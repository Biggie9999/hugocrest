import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=')));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function test() {
  console.log('Testing Supabase connection...');
  const start = Date.now();
  const { data, error } = await supabase.from('accounts').select('*').limit(1);
  console.log('Time taken:', Date.now() - start, 'ms');
  console.log('Data:', data);
  console.log('Error:', error);
}
test();
