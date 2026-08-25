"use client";

import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '../internal/page.module.css';

const payees = [
  { id: 'att',      label: 'AT&T',              sub: 'Auto-pay  ·  Due Jun 1',   amount: '$89.99'  },
  { id: 'electric', label: 'City Electric Co.',  sub: 'Due Jun 5',                amount: '$114.50' },
  { id: 'internet', label: 'Spectrum Internet',  sub: 'Due Jun 12',               amount: '$54.99'  },
  { id: 'rent',     label: 'Landlord — Rent',    sub: 'Due Jun 1',                amount: '$1,200'  },
];

export default function PayBillsPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => router.back()} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.pageTitle}>Pay Bills</h1>
        <button className={styles.closeBtn} onClick={() => router.push('/dashboard')} aria-label="Close">
          <X size={22} />
        </button>
      </div>

      <div className={styles.sectionBody}>
        <ul className={styles.sectionList}>
          {payees.map((p) => (
            <li key={p.id}>
              <div className={styles.sectionItem}>
                <div className={styles.itemMeta}>
                  <span className={styles.itemLabel}>{p.label}</span>
                  <span className={styles.itemSub}>{p.sub}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: 'calc(15px + var(--font-add, 0px))', color: '#111', fontWeight: 500 }}>{p.amount}</span>
                  <ChevronRight size={18} color="#aaa" />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.addPayeeRow} onClick={() => router.push('/dashboard')}>
          <Plus size={18} />
          <span>Add a payee</span>
        </div>
      </div>
    </div>
  );
}
