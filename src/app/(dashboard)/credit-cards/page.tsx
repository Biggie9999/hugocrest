"use client";
import React from 'react';
import Link from 'next/link';

export default function CreditCardsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 20px', fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Link href="/dashboard" style={{ color: '#047857', textDecoration: 'none', fontSize: 'calc(24px + var(--font-add, 0px))', fontWeight: 'bold' }}>&larr;</Link>
        <h1 style={{ fontSize: 'calc(22px + var(--font-add, 0px))', fontWeight: '600', color: '#424242', margin: 0 }}>Cards</h1>
      </div>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ fontSize: 'calc(18px + var(--font-add, 0px))', color: '#047857', marginBottom: '16px' }}>Manage Your Cards</h2>
        <p style={{ color: '#666e71', fontSize: 'calc(14px + var(--font-add, 0px))', lineHeight: '1.6' }}>
          View your active debit and credit cards, manage limits, report lost/stolen cards, or request a replacement.
        </p>
        <div style={{ marginTop: '20px', border: '1px solid #eeeeee', borderRadius: '8px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ color: '#424242', fontSize: 'calc(16px + var(--font-add, 0px))' }}>Hugocrest Platinum Visa</strong>
              <div style={{ color: '#999999', fontSize: 'calc(12px + var(--font-add, 0px))', marginTop: '4px' }}>**** **** **** 4092</div>
            </div>
            <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: 'calc(12px + var(--font-add, 0px))', fontWeight: 'bold' }}>Active</span>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <button style={{ flex: 1, padding: '10px', backgroundColor: '#047857', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>View Details</button>
            <button style={{ flex: 1, padding: '10px', backgroundColor: '#f9f9f9', color: '#666e71', border: '1px solid #eeeeee', borderRadius: '4px', cursor: 'pointer' }}>Freeze Card</button>
          </div>
        </div>
      </div>
    </div>
  );
}
