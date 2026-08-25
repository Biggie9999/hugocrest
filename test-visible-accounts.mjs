import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=')));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const { data: accountsData } = await supabase.from('accounts').select('*');
const visibleAccounts = accountsData.filter(a => {
  if (a.account_number === '...0000' || a.type === 'external') return false;
  if (!a.name) return true;
  const n = a.name.toUpperCase();
  if (n.includes('TEST - TEST') || n === 'YY' || n.includes('HSBC - AME FRED') || n.includes('BENN - BANK')) return false;
  return true;
});

const userIdsWithVisibleAccounts = new Set(visibleAccounts.map(a => a.user_id));
const { data: profiles } = await supabase.from('profiles').select('id, email, display_name');
const usersWithoutVisible = profiles.filter(p => !userIdsWithVisibleAccounts.has(p.id));
console.log('Users without visible accounts:', usersWithoutVisible);
