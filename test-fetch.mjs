import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=')));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const userId = 'c2691ea8-de20-4415-b810-406ad02558ed'; // One of the users
try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('display_name, first_name')
        .eq('id', userId)
        .maybeSingle();
      console.log('Profile:', profileData, profileError);
      
      const { data: accountsData, error: accountsError } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });
      console.log('Accounts:', accountsData, accountsError);

      if (accountsData) {
        const visibleAccounts = accountsData.filter(a => {
          if (a.account_number === '...0000' || a.type === 'external') return false;
          if (!a.name) return true; // prevent error if name is null
          const n = a.name.toUpperCase();
          if (n.includes('TEST - TEST') || n === 'YY' || n.includes('HSBC - AME FRED') || n.includes('BENN - BANK')) return false;
          return true;
        });
        console.log('Visible:', visibleAccounts);
      }
} catch (err) {
  console.log('Threw:', err);
}
