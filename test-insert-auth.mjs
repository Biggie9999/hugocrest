import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=')));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const email = `test_insert_${Date.now()}@example.com`;
const { data: authData } = await supabase.auth.signUp({ email, password: 'Password123!' });
const uid = authData.user.id;

// Delete profile to simulate missing profile
await supabase.from('profiles').delete().eq('id', uid);

// Now try to insert profile as the user
const { error } = await supabase.from('profiles').insert({ id: uid, display_name: 'Manual Insert', email });
console.log('Insert profile as user error:', error);
