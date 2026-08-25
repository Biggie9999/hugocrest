"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, X, ChevronRight } from 'lucide-react';
import styles from './page.module.css';

const sections = [
  {
    heading: 'Profile',
    items: [
      { label: 'Contact Information', href: '/contact' },
      { label: 'Username',            href: '/profile' },
      { label: 'Password',            href: '/profile' },
      { label: 'Language Preference', href: '/profile' },
      { label: 'Privacy Preferences', href: '/profile' },
    ],
  },
];

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={20} />
        </button>
        <span className={styles.headerTitle}>Profile &amp; Settings</span>
        <button className={styles.closeBtn} onClick={() => router.push('/dashboard')}>
          <X size={20} />
        </button>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.heading} className={styles.section}>
          <div className={styles.sectionHeading}>{section.heading}</div>
          {section.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={styles.settingsRow}
            >
              <span>{item.label}</span>
              <ChevronRight size={18} color="#999" />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
