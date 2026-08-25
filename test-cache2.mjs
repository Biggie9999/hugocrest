import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hpodnzrimhvzobebzjaz.supabase.co',
  'sb_publishable_1SjjCSJPIWRjiKnCb_EzhA_c13vwXVk'
);

async function test() {
  const cacheBuster = `nocache-${Date.now()}`;
  const { data, error } = await supabase.from('profiles').select('*').neq('display_name', cacheBuster);
  console.log("Error:", error);
  console.log("Data length:", data?.length);
}

test();
