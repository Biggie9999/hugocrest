"use client";
import React from 'react';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 20px', fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Link href="/dashboard" style={{ color: '#047857', textDecoration: 'none', fontSize: 'calc(24px + var(--font-add, 0px))', fontWeight: 'bold' }}>&larr;</Link>
        <h1 style={{ fontSize: 'calc(22px + var(--font-add, 0px))', fontWeight: '600', color: '#424242', margin: 0 }}>Help & Support</h1>
      </div>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ fontSize: 'calc(18px + var(--font-add, 0px))', color: '#047857', marginBottom: '16px' }}>How can we assist you?</h2>
        <p style={{ color: '#666e71', fontSize: 'calc(14px + var(--font-add, 0px))', lineHeight: '1.6', marginBottom: '20px' }}>
          Our private banking support team is available 24/7. Select a topic below or contact your dedicated advisor directly.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '16px', border: '1px solid #eeeeee', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div>
              <strong style={{ color: '#424242', fontSize: 'calc(14px + var(--font-add, 0px))', display: 'block' }}>Contact Your Advisor</strong>
              <span style={{ color: '#999999', fontSize: 'calc(12px + var(--font-add, 0px))' }}>Send a secure message or schedule a call.</span>
            </div>
            <span style={{ color: '#047857', fontWeight: 'bold' }}>&gt;</span>
          </div>
          <div style={{ padding: '16px', border: '1px solid #eeeeee', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div>
              <strong style={{ color: '#424242', fontSize: 'calc(14px + var(--font-add, 0px))', display: 'block' }}>Report Fraud</strong>
              <span style={{ color: '#999999', fontSize: 'calc(12px + var(--font-add, 0px))' }}>Lock accounts or dispute a transaction.</span>
            </div>
            <span style={{ color: '#047857', fontWeight: 'bold' }}>&gt;</span>
          </div>
          <div style={{ padding: '16px', border: '1px solid #eeeeee', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div>
              <strong style={{ color: '#424242', fontSize: 'calc(14px + var(--font-add, 0px))', display: 'block' }}>FAQs & Documents</strong>
              <span style={{ color: '#999999', fontSize: 'calc(12px + var(--font-add, 0px))' }}>Browse tax forms and common questions.</span>
            </div>
            <span style={{ color: '#047857', fontWeight: 'bold' }}>&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
