import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=')));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function test() {
  const { data, error } = await supabase.from('transactions').insert({
    from_account_id: 'e69c766e-52b8-4c90-95b8-d21051515286', // Need a valid one, I will just select one first
    to_account_id: null,
    amount: 10,
    status: 'completed'
  });
  console.log(error);
}
test();
