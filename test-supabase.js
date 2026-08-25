const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function test() {
  console.log('Testing Supabase connection...');
  const start = Date.now();
  const { data, error } = await supabase.from('accounts').select('*').limit(1);
  console.log('Time taken:', Date.now() - start, 'ms');
  console.log('Data:', data);
  console.log('Error:', error);
}
test();
