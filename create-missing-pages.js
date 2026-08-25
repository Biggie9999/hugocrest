const fs = require('fs');
const path = require('path');

const dashboardDir = path.join(__dirname, 'src', 'app', '(dashboard)');

const pages = [
  {
    route: 'credit-cards',
    title: 'Cards',
    content: `
      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', color: '#baa16f', marginBottom: '16px' }}>Manage Your Cards</h2>
        <p style={{ color: '#666e71', fontSize: '14px', lineHeight: '1.6' }}>
          View your active debit and credit cards, manage limits, report lost/stolen cards, or request a replacement.
        </p>
        <div style={{ marginTop: '20px', border: '1px solid #eeeeee', borderRadius: '8px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ color: '#424242', fontSize: '16px' }}>Lienhardt Platinum Visa</strong>
              <div style={{ color: '#999999', fontSize: '12px', marginTop: '4px' }}>**** **** **** 4092</div>
            </div>
            <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>Active</span>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <button style={{ flex: 1, padding: '10px', backgroundColor: '#baa16f', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>View Details</button>
            <button style={{ flex: 1, padding: '10px', backgroundColor: '#f9f9f9', color: '#666e71', border: '1px solid #eeeeee', borderRadius: '4px', cursor: 'pointer' }}>Freeze Card</button>
          </div>
        </div>
      </div>
    `
  },
  {
    route: 'education',
    title: 'Financial Planning',
    content: `
      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', color: '#baa16f', marginBottom: '16px' }}>Wealth Management Insights</h2>
        <p style={{ color: '#666e71', fontSize: '14px', lineHeight: '1.6' }}>
          Explore personalized financial planning reports, track your spending habits, and review your debt-to-income ratio to ensure long-term wealth growth.
        </p>
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '6px', border: '1px solid #eeeeee' }}>
            <h3 style={{ fontSize: '14px', color: '#424242', marginBottom: '8px' }}>FICO® Score</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#baa16f' }}>742</div>
            <div style={{ fontSize: '12px', color: '#166534', marginTop: '4px' }}>+12 pts this month</div>
          </div>
          <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '6px', border: '1px solid #eeeeee' }}>
            <h3 style={{ fontSize: '14px', color: '#424242', marginBottom: '8px' }}>Monthly Spend</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#424242' }}>CHF 4,250</div>
            <div style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>In line with budget</div>
          </div>
        </div>
        <button style={{ width: '100%', marginTop: '20px', padding: '12px', backgroundColor: '#baa16f', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Schedule Consultation</button>
      </div>
    `
  },
  {
    route: 'help',
    title: 'Help & Support',
    content: `
      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', color: '#baa16f', marginBottom: '16px' }}>How can we assist you?</h2>
        <p style={{ color: '#666e71', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
          Our private banking support team is available 24/7. Select a topic below or contact your dedicated advisor directly.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '16px', border: '1px solid #eeeeee', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div>
              <strong style={{ color: '#424242', fontSize: '14px', display: 'block' }}>Contact Your Advisor</strong>
              <span style={{ color: '#999999', fontSize: '12px' }}>Send a secure message or schedule a call.</span>
            </div>
            <span style={{ color: '#baa16f', fontWeight: 'bold' }}>&gt;</span>
          </div>
          <div style={{ padding: '16px', border: '1px solid #eeeeee', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div>
              <strong style={{ color: '#424242', fontSize: '14px', display: 'block' }}>Report Fraud</strong>
              <span style={{ color: '#999999', fontSize: '12px' }}>Lock accounts or dispute a transaction.</span>
            </div>
            <span style={{ color: '#baa16f', fontWeight: 'bold' }}>&gt;</span>
          </div>
          <div style={{ padding: '16px', border: '1px solid #eeeeee', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div>
              <strong style={{ color: '#424242', fontSize: '14px', display: 'block' }}>FAQs & Documents</strong>
              <span style={{ color: '#999999', fontSize: '12px' }}>Browse tax forms and common questions.</span>
            </div>
            <span style={{ color: '#baa16f', fontWeight: 'bold' }}>&gt;</span>
          </div>
        </div>
      </div>
    `
  }
];

pages.forEach(page => {
  const pageDir = path.join(dashboardDir, page.route);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  const jsxContent = \`"use client";

import React from 'react';
import Link from 'next/link';

export default function \${page.route.replace(/-./g, x=>x[1].toUpperCase()).replace(/^./, x=>x.toUpperCase())}Page() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 20px', fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Link href="/dashboard" style={{ color: '#baa16f', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>&larr;</Link>
        <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#424242', margin: 0 }}>\${page.title}</h1>
      </div>
      
      \${page.content}
    </div>
  );
}
\`;

  fs.writeFileSync(path.join(pageDir, 'page.js'), jsxContent);
});

console.log('Created missing dashboard pages.');
