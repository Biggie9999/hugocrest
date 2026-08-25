"use client";

import { ChevronLeft, X, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '../internal/page.module.css';

export default function DepositChecksPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => router.back()} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.pageTitle}>Deposit Checks</h1>
        <button className={styles.closeBtn} onClick={() => router.push('/dashboard')} aria-label="Close">
          <X size={22} />
        </button>
      </div>

      <div className={styles.depositBody}>
        <p className={styles.depositIntro}>
          Deposit checks anytime, anywhere using your phone&apos;s camera. Simply take a photo of the front and back of your endorsed check.
        </p>

        <ul className={styles.stepList}>
          <li className={styles.step}>
            <span className={styles.stepNum}>1</span>
            <span className={styles.stepText}>Endorse the back of your check by signing your name.</span>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNum}>2</span>
            <span className={styles.stepText}>Select the account you want to deposit into.</span>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNum}>3</span>
            <span className={styles.stepText}>Enter the check amount.</span>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNum}>4</span>
            <span className={styles.stepText}>Take a photo of the front and back of the check.</span>
          </li>
        </ul>

        <button className={styles.primaryBtn} onClick={() => router.push('/dashboard')}>
          <Camera size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
          Deposit a Check
        </button>
      </div>
    </div>
  );
}
