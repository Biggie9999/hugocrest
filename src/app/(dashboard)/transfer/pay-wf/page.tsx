"use client";

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '../internal/page.module.css';

const wfAccounts = [
  { id: 'home',  label: 'HOME FURNISHINGS',    sub: '...3741  ·  Outstanding balance $1,888.77' },
  { id: 'flex',  label: 'LIENHARDT FLEX LOAN', sub: '...2728  ·  Paid in full' },
];

export default function PayWFAccountsPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => router.back()} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.pageTitle}>Pay WF Accounts</h1>
        <button className={styles.closeBtn} onClick={() => router.push('/dashboard')} aria-label="Close">
          <X size={22} />
        </button>
      </div>

      <div className={styles.sectionBody}>
        <ul className={styles.sectionList}>
          {wfAccounts.map((acct) => (
            <li key={acct.id}>
              <div className={styles.sectionItem}>
                <div className={styles.itemMeta}>
                  <span className={styles.itemLabel}>{acct.label}</span>
                  <span className={styles.itemSub}>{acct.sub}</span>
                </div>
                <ChevronRight size={18} color="#aaa" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
