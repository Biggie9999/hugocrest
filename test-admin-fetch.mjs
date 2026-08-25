import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hpodnzrimhvzobebzjaz.supabase.co',
  'sb_publishable_1SjjCSJPIWRjiKnCb_EzhA_c13vwXVk'
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
