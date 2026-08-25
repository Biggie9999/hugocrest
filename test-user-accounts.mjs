import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=')));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const { data: accounts } = await supabase.from('accounts').select('user_id');
console.log('Accounts count:', accounts?.length);
const { data: profiles } = await supabase.from('profiles').select('id, display_name, email');
console.log('Profiles count:', profiles?.length);

const userIdsWithAccounts = new Set(accounts?.map(a => a.user_id));
const usersWithoutAccounts = profiles?.filter(p => !userIdsWithAccounts.has(p.id));
console.log('Users without accounts:', usersWithoutAccounts);

