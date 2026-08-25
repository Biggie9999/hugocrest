"use client";

import { ChevronLeft, ChevronRight, X, Plus, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '../internal/page.module.css';

const recurring = [
  { id: 'electric', label: 'City Electric Co.',  sub: 'Monthly  ·  Next: Jun 5  ·  $114.50' },
  { id: 'spectrum',  label: 'Spectrum Internet',  sub: 'Monthly  ·  Next: Jun 12  ·  $54.99'  },
];

export default function RecurringPaymentsPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => router.back()} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.pageTitle}>Recurring Payments</h1>
        <button className={styles.closeBtn} onClick={() => router.push('/dashboard')} aria-label="Close">
          <X size={22} />
        </button>
      </div>

      <div className={styles.sectionBody}>
        {recurring.length > 0 ? (
          <>
            <ul className={styles.sectionList}>
              {recurring.map((item) => (
                <li key={item.id}>
                  <div className={styles.sectionItem}>
                    <div className={styles.itemMeta}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RefreshCw size={14} color="#888" />
                        <span className={styles.itemLabel}>{item.label}</span>
                      </span>
                      <span className={styles.itemSub}>{item.sub}</span>
                    </div>
                    <ChevronRight size={18} color="#aaa" />
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.addPayeeRow} onClick={() => router.push('/dashboard')}>
              <Plus size={18} />
              <span>Set up a recurring payment</span>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔁</div>
            <p>You have no recurring payments set up.</p>
            <p>Set up recurring payments to automatically pay your bills on time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
