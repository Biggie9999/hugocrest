import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.vercel.prod', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=').map(s => s.replace(/^"|"$/g, '').replace(/\\n/g, ''))));

async function run() {
  const userHtmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 2px solid #baa16f; padding-bottom: 10px;">Welcome to Privatbank Zürich!</h2>
        <p style="color: #555; font-size: 16px;">Dear Leonard,</p>
        <p style="color: #555; font-size: 16px;">Thank you for enrolling with Privatbank Zürich. We have successfully received your application.</p>
        <p style="color: #555; font-size: 16px;">You can now log into your online banking dashboard at any time using your email and password.</p>
        <br/>
        <p style="color: #777; font-size: 14px;">Best regards,<br/>The Privatbank Zürich Team</p>
      </div>
    `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY || process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Privatbank System <support@lienhardtandpartners.com>',
      to: 'leonardcesar04231@gmail.com',
      subject: `Welcome to Privatbank Zürich, Leonard!`,
      html: userHtmlBody
    })
  });
  console.log(res.status, await res.text());
}
run();
