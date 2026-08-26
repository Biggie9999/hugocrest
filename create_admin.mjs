import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hpodnzrimhvzobebzjaz.supabase.co';
const supabaseKey = 'sb_publishable_1SjjCSJPIWRjiKnCb_EzhA_c13vwXVk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@gmail.com',
    password: 'Password123!',
    options: {
      data: {
        first_name: 'Admin',
        last_name: 'User'
      }
    }
  });

  if (error) {
    console.error('Error object:', error);
  } else {
    console.log('User created successfully:', data.user?.email);
    console.log('Data:', data);
  }
}

createAdmin();
