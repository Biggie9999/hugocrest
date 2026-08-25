"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Plus, Minus, Info, Home } from 'lucide-react';
import Link from 'next/link';
import { useBank } from '@/context/BankContext';
import styles from './page.module.css';

type Section = 'email' | 'phone' | 'address';

export default function ContactPage() {
  const router = useRouter();
  const { user } = useBank();
  
  const [open, setOpen]         = useState<Section | null>(null);
  
  const email = user?.email || '';
  const phone = user?.user_metadata?.phone || '';
  const addressStr = user?.user_metadata?.address || '';
  
  const [primaryEmail, setPrimaryEmail] = useState(email);
  const [homePhone]             = useState(phone);
  const [mobile1]               = useState(phone);
  const [homeAlerts, setHomeAlerts]   = useState(true);
  const [mobile1Alerts, setMobile1Alerts] = useState(true);
  const [preferred]             = useState('Mobile 1');

  const toggle = (s: Section) => setOpen((prev) => (prev === s ? null : s));

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={20} />
        </button>
      </div>

      <h1 className={styles.title}>Update contact information</h1>

      {/* ── Email Addresses ── */}
      <div className={styles.accordion}>
        <button className={styles.accordionHeader} onClick={() => toggle('email')}>
          <span className={`${styles.accordionLabel} ${open === 'email' ? styles.underlined : ''}`}>
            Email addresses
          </span>
          {open === 'email'
            ? <Minus size={18} color="#555" />
            : <Plus size={18} color="#555" />
          }
        </button>

        {open === 'email' && (
          <div className={styles.accordionBody}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Primary</label>
              <input
                className={styles.input}
                value={primaryEmail}
                onChange={(e) => setPrimaryEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <input className={`${styles.input} ${styles.inputEmpty}`} placeholder="Secondary (optional)" />
            </div>
            <div className={styles.inputGroup}>
              <input className={`${styles.input} ${styles.inputEmpty}`} placeholder="Other (optional)" />
            </div>
            <button className={styles.saveBtn} disabled>Save</button>
          </div>
        )}
      </div>

      {/* ── Phone Numbers ── */}
      <div className={styles.accordion}>
        <button className={styles.accordionHeader} onClick={() => toggle('phone')}>
          <span className={`${styles.accordionLabel} ${open === 'phone' ? styles.underlined : ''}`}>
            Phone numbers
          </span>
          {open === 'phone'
            ? <Minus size={18} color="#555" />
            : <Plus size={18} color="#555" />
          }
        </button>

        {open === 'phone' && (
          <div className={styles.accordionBody}>
            <div className={styles.phoneHelpRow}>
              <Link href="/help" className={styles.helpLink}>Help</Link>
            </div>

            {/* Home */}
            <div className={styles.phoneGroup}>
              <label className={styles.phoneLabel}>Home (Optional)</label>
              <input className={styles.input} defaultValue={homePhone} />
              <div className={styles.checkRow}>
                <input
                  type="checkbox"
                  id="homeAlerts"
                  checked={homeAlerts}
                  onChange={() => setHomeAlerts(!homeAlerts)}
                  className={styles.checkbox}
                />
                <label htmlFor="homeAlerts" className={styles.checkLabel}>
                  Allow text alerts and calls related to your accounts.{' '}
                  <Link href="/help" className={styles.learnMore}>Learn more</Link>
                </label>
              </div>
            </div>

            {/* Work */}
            <div className={styles.phoneGroup}>
              <label className={styles.phoneLabel}>Work (Optional)</label>
              <input className={`${styles.input} ${styles.inputEmpty}`} placeholder="" />
              <div className={styles.checkRow}>
                <input type="checkbox" id="workAlerts" className={styles.checkbox} />
                <label htmlFor="workAlerts" className={styles.checkLabel}>
                  Allow text alerts and calls related to your accounts.{' '}
                  <Link href="/help" className={styles.learnMore}>Learn more</Link>
                </label>
              </div>
            </div>

            {/* Extension */}
            <div className={styles.phoneGroup}>
              <label className={styles.phoneLabel}>Extension (Optional)</label>
              <input className={`${styles.input} ${styles.inputEmpty}`} placeholder="" />
            </div>

            {/* Mobile 1 */}
            <div className={styles.phoneGroup}>
              <label className={styles.phoneLabel}>Mobile 1</label>
              <input className={styles.input} defaultValue={mobile1} />
              <div className={styles.checkRow}>
                <input
                  type="checkbox"
                  id="mobile1Alerts"
                  checked={mobile1Alerts}
                  onChange={() => setMobile1Alerts(!mobile1Alerts)}
                  className={styles.checkbox}
                />
                <label htmlFor="mobile1Alerts" className={styles.checkLabel}>
                  Allow text alerts and calls related to your accounts.{' '}
                  <Link href="/help" className={styles.learnMore}>Learn more</Link>
                </label>
              </div>
            </div>

            {/* Mobile 2 */}
            <div className={styles.phoneGroup}>
              <label className={styles.phoneLabel}>Mobile 2 (Optional)</label>
              <input className={`${styles.input} ${styles.inputEmpty}`} placeholder="" />
              <div className={styles.checkRow}>
                <input type="checkbox" id="mobile2Alerts" className={styles.checkbox} />
                <label htmlFor="mobile2Alerts" className={styles.checkLabel}>
                  Allow text alerts and calls related to your accounts.{' '}
                  <Link href="/help" className={styles.learnMore}>Learn more</Link>
                </label>
              </div>
            </div>

            {/* Preferred */}
            <div className={styles.phoneGroup}>
              <label className={styles.phoneLabel}>Preferred contact number</label>
              <div className={styles.selectWrapper}>
                <select className={styles.select} defaultValue={preferred}>
                  <option>Mobile 1</option>
                  <option>Home</option>
                  <option>Work</option>
                  <option>Mobile 2</option>
                </select>
              </div>
            </div>

            <button className={styles.saveBtn} disabled>Save</button>
          </div>
        )}
      </div>

      {/* ── Addresses ── */}
      <div className={styles.accordion}>
        <button className={styles.accordionHeader} onClick={() => toggle('address')}>
          <span className={`${styles.accordionLabel} ${open === 'address' ? styles.underlined : ''}`}>
            Addresses
          </span>
          {open === 'address'
            ? <Minus size={18} color="#555" />
            : <Plus size={18} color="#555" />
          }
        </button>

        {open === 'address' && (
          <div className={styles.accordionBody}>
            {/* USPS notice */}
            <div className={styles.uspsNotice}>
              <Info size={16} color="#444" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>We&apos;ve updated your addresses to the standardized USPS format to help improve delivery.</span>
            </div>

            {/* Home address */}
            <div className={styles.addressGroup}>
              <div className={styles.addressGroupTitle}>
                Home/Permanent address
                <span className={styles.homeIcon}><Home size={14} /></span>
              </div>
              <div className={styles.addressRow}>
                <span className={styles.addressText}>
                  {addressStr ? addressStr : 'No address provided'}
                </span>
                <button className={styles.editLink}>Edit</button>
              </div>
            </div>

            {/* Mailing addresses */}
            <div className={styles.addressGroup}>
              <div className={styles.addressGroupTitle}>Mailing addresses</div>
              <Link href="/help" className={styles.addMailingLink}>Add a new mailing address</Link>

              <div className={styles.addressRow} style={{ marginTop: 12 }}>
                <span className={styles.addressText}>
                  {addressStr ? addressStr : 'No address provided'}
                </span>
                <button className={styles.editLink}>Edit</button>
              </div>
            </div>

            <p className={styles.addressDisclaimer}>
              Some closed accounts and debit cards may display for approximately 90 days after the date of closure or after the account balance is $0 for closed credit card accounts. If you have any questions about accounts or cards listed that you don&apos;t recognize, please contact 1-800-869-3557.
            </p>
          </div>
        )}
      </div>

      {/* Disclosures */}
      <div className={styles.disclosures}>
        <p className={styles.disclosureTitle}>* Disclosures</p>
        <p className={styles.disclosureText}>Deposit products offered by Hugocrest Hugocrest Bank Zürich AG.</p>
        <p className={styles.disclosureText}><Home size={12} style={{ display: 'inline', marginRight: 4 }} />Equal Housing Lender</p>
      </div>
    </div>
  );
}
