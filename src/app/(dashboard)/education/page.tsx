"use client";
import React from 'react';
import Link from 'next/link';

export default function EducationPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 20px', fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Link href="/dashboard" style={{ color: '#047857', textDecoration: 'none', fontSize: 'calc(24px + var(--font-add, 0px))', fontWeight: 'bold' }}>&larr;</Link>
        <h1 style={{ fontSize: 'calc(22px + var(--font-add, 0px))', fontWeight: '600', color: '#424242', margin: 0 }}>Financial Planning</h1>
      </div>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ fontSize: 'calc(18px + var(--font-add, 0px))', color: '#047857', marginBottom: '16px' }}>Wealth Management Insights</h2>
        <p style={{ color: '#666e71', fontSize: 'calc(14px + var(--font-add, 0px))', lineHeight: '1.6' }}>
          Explore personalized financial planning reports, track your spending habits, and review your debt-to-income ratio to ensure long-term wealth growth.
        </p>
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '6px', border: '1px solid #eeeeee' }}>
            <h3 style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#424242', marginBottom: '8px' }}>ZEK Score</h3>
            <div style={{ fontSize: 'calc(24px + var(--font-add, 0px))', fontWeight: 'bold', color: '#047857' }}>742</div>
            <div style={{ fontSize: 'calc(12px + var(--font-add, 0px))', color: '#166534', marginTop: '4px' }}>+12 pts this month</div>
          </div>
          <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '6px', border: '1px solid #eeeeee' }}>
            <h3 style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#424242', marginBottom: '8px' }}>Monthly Spend</h3>
            <div style={{ fontSize: 'calc(24px + var(--font-add, 0px))', fontWeight: 'bold', color: '#424242' }}>£4,250</div>
            <div style={{ fontSize: 'calc(12px + var(--font-add, 0px))', color: '#999999', marginTop: '4px' }}>In line with budget</div>
          </div>
        </div>
        <button style={{ width: '100%', marginTop: '20px', padding: '12px', backgroundColor: '#047857', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Schedule Consultation</button>
      </div>
    </div>
  );
}
