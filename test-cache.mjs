import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hpodnzrimhvzobebzjaz.supabase.co',
  'sb_publishable_1SjjCSJPIWRjiKnCb_EzhA_c13vwXVk'
);

async function test() {
  const cacheBuster = `nocache-${Date.now()}`;
  const { data, error } = await supabase.from('profiles').select('*').neq('id', cacheBuster);
  console.log("Error:", error);
  console.log("Data:", data);
}

test();
