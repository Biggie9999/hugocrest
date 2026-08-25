"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function InternalTransferPage() {
  const router = useRouter();
  const [fromAccount, setFromAccount] = useState<string | null>(null);
  const [toAccount, setToAccount] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'from' | 'to' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => router.back()} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.pageTitle}>Transfer</h1>
        <button className={styles.closeBtn} onClick={() => router.push('/dashboard')} aria-label="Close">
          <X size={22} />
        </button>
      </div>

      <div className={styles.body}>
        {/* From */}
        <div className={styles.fieldRow} onClick={() => setActiveModal('from')}>
          <span className={fromAccount ? styles.selectedText : styles.placeholderText}>
            {fromAccount ?? 'From which account?'}
          </span>
          <div className={styles.iconCircle}><ChevronRight size={18} color="#555" /></div>
        </div>
        <div className={styles.divider} />

        {/* To */}
        <div className={styles.fieldRow} onClick={() => setActiveModal('to')}>
          <span className={toAccount ? styles.selectedText : styles.placeholderText}>
            {toAccount ?? 'To which account?'}
          </span>
          <div className={styles.iconCircle}><ChevronRight size={18} color="#555" /></div>
        </div>
        <div className={styles.divider} />

        <div className={styles.addLink}>Add Non-Wells Fargo Account</div>
        <p className={styles.infoText}>
          Add non-Wells Fargo accounts to make transfers or payments between your eligible accounts at Wells Fargo and other financial institutions.
        </p>
      </div>

      {/* Bottom Sheet Modal */}
      {activeModal && (
        <>
          <div className={styles.overlay} onClick={closeModal} />
          <div className={styles.sheet}>
            <div className={styles.sheetHeader}>
              <span className={styles.sheetTitle}>Select Account</span>
              <button className={styles.sheetClose} onClick={closeModal}><X size={22} /></button>
            </div>
            <div
              className={styles.sheetOption}
              onClick={() => { setFromAccount('PRIME CHECKING ...2419'); closeModal(); }}
            >
              <div className={styles.optionName}>PRIME CHECKING</div>
              <div className={styles.optionDetail}>...2419 &nbsp;·&nbsp; Available balance &nbsp;<strong>-$132.20</strong></div>
            </div>
            {activeModal === 'to' && (
              <div
                className={styles.sheetOption}
                onClick={() => { setToAccount('HOME FURNISHINGS ...3741'); closeModal(); }}
              >
                <div className={styles.optionName}>HOME FURNISHINGS</div>
                <div className={styles.optionDetail}>...3741 &nbsp;·&nbsp; Outstanding balance &nbsp;<strong>$1,888.77</strong></div>
              </div>
            )}
            <div className={styles.sheetAddOption}>
              <span>Add non-Wells Fargo Account</span>
              <ChevronRight size={18} color="#555" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
