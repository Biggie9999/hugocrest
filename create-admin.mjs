import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=')));

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@gmail.com',
    password: 'test123',
  });
  
  if (error) {
    console.error("Error creating user:", error.message);
  } else {
    console.log("Success! User created:", data.user?.email);
  }
}

createAdmin();
