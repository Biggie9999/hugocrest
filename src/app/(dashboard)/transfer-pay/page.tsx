"use client";

import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import styles from './page.module.css';
import Link from 'next/link';

const menuItems = [
  { label: 'Transfer',              href: '/transfer'           },
  { label: 'Pay Bills',             href: '/transfer/pay-bills' },
  { label: 'Pay Hugocrest Accounts', href: '/transfer/pay-wf'   },
  { label: 'Recurring Payments',    href: '/transfer/recurring' },
];

export default function TransferPayMenuPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => router.back()} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.pageTitle}>Transfer &amp; Pay</h1>
        <button className={styles.closeBtn} onClick={() => router.push('/dashboard')} aria-label="Close">
          <X size={22} />
        </button>
      </div>

      {/* Menu List */}
      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.href} className={styles.menuItem}>
            <Link href={item.href} className={styles.menuLink}>
              <span className={styles.menuLabel}>{item.label}</span>
              <ChevronRight size={20} color="#666" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
