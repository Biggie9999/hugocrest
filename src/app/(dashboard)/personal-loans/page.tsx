"use client";
import React from 'react';
import Link from 'next/link';

export default function PersonalLoansPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 20px', fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Link href="/dashboard" style={{ color: '#047857', textDecoration: 'none', fontSize: 'calc(24px + var(--font-add, 0px))', fontWeight: 'bold' }}>&larr;</Link>
        <h1 style={{ fontSize: 'calc(22px + var(--font-add, 0px))', fontWeight: '600', color: '#424242', margin: 0 }}>Flex Loan</h1>
      </div>
      
      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ fontSize: 'calc(18px + var(--font-add, 0px))', color: '#047857', marginBottom: '16px' }}>Loan Details</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #eeeeee', marginBottom: '16px' }}>
          <div>
            <div style={{ color: '#666e71', fontSize: 'calc(14px + var(--font-add, 0px))' }}>Current Balance</div>
            <div style={{ color: '#424242', fontSize: 'calc(24px + var(--font-add, 0px))', fontWeight: 'bold' }}>CHF 4,120.50</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#666e71', fontSize: 'calc(14px + var(--font-add, 0px))' }}>Next Payment Due</div>
            <div style={{ color: '#424242', fontSize: 'calc(16px + var(--font-add, 0px))', fontWeight: 'bold' }}>Oct 01, 2026</div>
          </div>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f9f9f9' }}>
            <span style={{ color: '#666e71', fontSize: 'calc(14px + var(--font-add, 0px))' }}>Interest Rate</span>
            <span style={{ color: '#424242', fontSize: 'calc(14px + var(--font-add, 0px))', fontWeight: '500' }}>6.50%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f9f9f9' }}>
            <span style={{ color: '#666e71', fontSize: 'calc(14px + var(--font-add, 0px))' }}>Original Loan Amount</span>
            <span style={{ color: '#424242', fontSize: 'calc(14px + var(--font-add, 0px))', fontWeight: '500' }}>CHF 10,000.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ color: '#666e71', fontSize: 'calc(14px + var(--font-add, 0px))' }}>Remaining Term</span>
            <span style={{ color: '#424242', fontSize: 'calc(14px + var(--font-add, 0px))', fontWeight: '500' }}>36 Months</span>
          </div>
        </div>

        <button style={{ width: '100%', padding: '12px', backgroundColor: '#047857', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Make a Payment</button>
      </div>
    </div>
  );
}
