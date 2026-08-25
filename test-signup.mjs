import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=')));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const email = `test_signup_${Date.now()}@example.com`;
console.log('Signing up:', email);
const { data, error } = await supabase.auth.signUp({
  email,
  password: 'Password123!',
  options: {
    data: {
      display_name: 'Test Signup',
      first_name: 'Test',
      last_name: 'Signup'
    }
  }
});

console.log('Signup error:', error);
console.log('User ID:', data?.user?.id);

if (data?.user?.id) {
  // Wait a bit for trigger
  await new Promise(r => setTimeout(r, 1000));
  const { data: prof } = await supabase.from('profiles').select('*').eq('id', data.user.id);
  const { data: acc } = await supabase.from('accounts').select('*').eq('user_id', data.user.id);
  console.log('Profile created:', prof?.length > 0);
  console.log('Accounts created:', acc?.length > 0);
}
