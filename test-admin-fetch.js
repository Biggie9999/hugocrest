require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  console.log("Fetching profiles using anon key...");
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error("Error:", error);
  } else {
    console.log(`Success! Found ${data.length} profiles.`);
  }
}

test();
