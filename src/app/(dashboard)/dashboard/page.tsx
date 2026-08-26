"use client";

import Link from 'next/link';
import { useBank } from '@/context/BankContext';
import {
  Mail, MoreVertical, Star, ChevronRight, PlusCircle, Home,
  ArrowLeftRight, FileText, Bell, Wallet, CreditCard, ArrowRightLeft, DollarSign, X
} from 'lucide-react';
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ─── account action trays ───────────────────────────────────────────────────
const accountActions: Record<string, { icon: React.ReactNode; label: string; href: string }[]> = {
  prime: [
    { icon: <ArrowLeftRight size={26} color="#fff" />,   label: 'Transfer\nMoney',     href: '/transfer' },
    { icon: <FileText      size={26} color="#fff" />,   label: 'View\nStatements',    href: '/messages' },
  ],
  home: [
    { icon: <DollarSign    size={26} color="#fff" />,   label: 'Make\nPayment',       href: '/transfer' },
    { icon: <FileText      size={26} color="#fff" />,   label: 'View\nStatements',    href: '/messages' },
  ],
  flex: [
    { icon: <FileText      size={26} color="#fff" />,   label: 'View Flex\nLoan Agreement', href: '/personal-loans' },
  ],
};

export default function DashboardPage() {
  const { accounts, isLoading, profileName, messages, markMessageRead } = useBank();
  
  if (isLoading) return null;

  const displayName = profileName;
  const router = useRouter();
  const [openTray, setOpenTray]       = useState<string | null>(null);
  const [activatedDeals, setActivatedDeals] = useState<Record<string, boolean>>({});

  const toggleTray = (id: string) => setOpenTray((prev) => (prev === id ? null : id));

  const handleActivate = (deal: string) =>
    setActivatedDeals((prev) => ({ ...prev, [deal]: true }));

  const deals = [
    { id: 'zattoo', label: 'Zattoo Premium', badge: 'Subscription Only', amount: '£20 cash back', exp: 'Expires 06/28/26' },
    { id: 'coop',     label: 'Coop',       badge: undefined,           amount: '10% cash back',  exp: 'Expires 05/31/26' },
    { id: 'dieci', label: 'Dieci Pizza', badge: undefined,      amount: '10% cash back',  exp: 'Expires 05/31/26' },
  ];

  // ─── Action Tray Row ────────────────────────────────────────────────────────
  const ActionTray = ({ accountId }: { accountId: string }) => {
    const actions = accountActions[accountId] ?? [];
    return (
      <div className={styles.actionTray}>
        {actions.map((a) => (
          <Link href={a.href} key={a.label} className={styles.actionTrayItem}>
            {a.icon}
            <span style={{ whiteSpace: 'pre-line' }}>{a.label}</span>
          </Link>
        ))}
      </div>
    );
  };

  const isFrozen = accounts.some(a => a.status === 'frozen');

  return (
    <div className={styles.dashboardContainer}>
      {/* ── Welcome ── */}
      <div style={{ fontSize: 'calc(28px + var(--font-add, 0px))', color: '#047857', fontWeight: '300', marginBottom: '4px' }}>Welcome, {displayName}</div>

      {/* ── Header ── */}
      <div className={styles.pageHeader}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1 className={styles.pageTitle}>Account Summary</h1>
        </div>
        <div className={styles.messages} style={{ position: 'relative', cursor: 'pointer' }} onClick={() => router.push('/messages')}>
          {messages && messages.filter(m => !m.is_read).length > 0 && (
            <span className={styles.badge}>{messages.filter(m => !m.is_read).length}</span>
          )}
          <Mail size={24} color="#0060a9" />
        </div>
      </div>

      {isFrozen && (
        <div className={styles.overdraftBanner} style={{ backgroundColor: '#fff4f4', borderColor: '#f44336' }}>
          <div className={styles.overdraftIcon} style={{ color: '#f44336' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className={styles.overdraftText}>
            <p style={{ color: '#d32f2f' }}><strong>Account Frozen.</strong> One or more of your accounts has been temporarily frozen. Please contact customer support immediately.</p>
          </div>
        </div>
      )}

      {/* ── Account List ── */}
      <div className={styles.accountList}>

        {accounts.length === 0 ? (
          <div className={styles.accountSection} style={{ padding: '40px 20px', textAlign: 'center', color: '#666e71' }}>
            <p>You do not have any open accounts yet.</p>
          </div>
        ) : (
          <>
            {accounts.filter(a => ['checking', 'savings'].includes(a.type)).length > 0 && (
              <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                <h3 style={{ fontSize: 'calc(18px + var(--font-add, 0px))', color: '#666e71', fontWeight: '500', marginLeft: '5px' }}>Deposit Accounts</h3>
                {accounts.filter(a => ['checking', 'savings'].includes(a.type)).map(acc => (
                  <div className={styles.accountSection} key={acc.id}>
                    <Link href={`/account/${acc.id}`} className={styles.accountCard} style={{ textDecoration: 'none' }}>
                      <div className={styles.accountRow}>
                        <div className={styles.accountInfo}>
                          <h2 className={styles.accountName}>{acc.name}</h2>
                          <div className={styles.accountNumber}>...{acc.account_number.slice(-4)}</div>
                        </div>
                        <div className={styles.accountBalance}>
                          <div className={styles.balanceAmount}>£{Math.abs(acc.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                          <div className={styles.balanceLabel}>{acc.balance >= 0 ? 'Available balance' : 'Outstanding balance'}</div>
                        </div>
                        <button
                          className={styles.moreBtn}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleTray(acc.id); }}
                          aria-label="More options"
                        >
                          <MoreVertical size={20} color={openTray === acc.id ? '#05d4f0' : '#5c6494'} />
                        </button>
                      </div>
                    </Link>
                    {openTray === acc.id && <ActionTray accountId="prime" />}
                  </div>
                ))}
              </div>
            )}

            {accounts.filter(a => ['loan', 'credit', 'mortgage'].includes(a.type)).length > 0 && (
              <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                <h3 style={{ fontSize: 'calc(18px + var(--font-add, 0px))', color: '#666e71', fontWeight: '500', marginLeft: '5px' }}>Credit Cards & Loans</h3>
                {accounts.filter(a => ['loan', 'credit', 'mortgage'].includes(a.type)).map(acc => (
                  <div className={styles.accountSection} key={acc.id}>
                    <Link href={`/account/${acc.id}`} className={styles.accountCard} style={{ textDecoration: 'none' }}>
                      <div className={styles.accountRow}>
                        <div className={styles.accountInfo}>
                          <h2 className={styles.accountName}>{acc.name}</h2>
                          <div className={styles.accountNumber}>...{acc.account_number.slice(-4)}</div>
                        </div>
                        <div className={styles.accountBalance}>
                          <div className={styles.balanceAmount}>£{Math.abs(acc.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                          <div className={styles.balanceLabel}>{acc.balance >= 0 ? 'Available balance' : 'Outstanding balance'}</div>
                        </div>
                        <button
                          className={styles.moreBtn}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleTray(acc.id); }}
                          aria-label="More options"
                        >
                          <MoreVertical size={20} color={openTray === acc.id ? '#05d4f0' : '#5c6494'} />
                        </button>
                      </div>
                    </Link>
                    {openTray === acc.id && <ActionTray accountId="home" />}
                  </div>
                ))}
              </div>
            )}

            {accounts.filter(a => ['investment'].includes(a.type)).length > 0 && (
              <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                <h3 style={{ fontSize: 'calc(18px + var(--font-add, 0px))', color: '#666e71', fontWeight: '500', marginLeft: '5px' }}>Investments & Brokerage</h3>
                {accounts.filter(a => ['investment'].includes(a.type)).map(acc => (
                  <div className={styles.accountSection} key={acc.id}>
                    <Link href={`/account/${acc.id}`} className={styles.accountCard} style={{ textDecoration: 'none' }}>
                      <div className={styles.accountRow}>
                        <div className={styles.accountInfo}>
                          <h2 className={styles.accountName}>{acc.name}</h2>
                          <div className={styles.accountNumber}>...{acc.account_number.slice(-4)}</div>
                        </div>
                        <div className={styles.accountBalance}>
                          <div className={styles.balanceAmount}>£{Math.abs(acc.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                          <div className={styles.balanceLabel}>{acc.balance >= 0 ? 'Available balance' : 'Outstanding balance'}</div>
                        </div>
                        <button
                          className={styles.moreBtn}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleTray(acc.id); }}
                          aria-label="More options"
                        >
                          <MoreVertical size={20} color={openTray === acc.id ? '#05d4f0' : '#5c6494'} />
                        </button>
                      </div>
                    </Link>
                    {openTray === acc.id && <ActionTray accountId="prime" />}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>

      {/* ── ZEK Bar ── */}
      <Link href="/education" className={styles.ficoBar}>
        View your ZEK Credit Score <ChevronRight size={16} />
      </Link>

      {/* ── Simplify Debt Banner ── */}
      <div className={styles.debtBanner}>
        <div className={styles.debtIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40" color="white">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        </div>
        <h3 className={styles.debtTitle}>Simplify debt</h3>
        <p className={styles.debtDesc}>Consolidate debt now with a personal loan</p>
        <button className={styles.debtBtn} onClick={() => router.push('/personal-loans')}>
          View loan options
        </button>
      </div>

      {/* ── Deals Section ── */}
      <div className={styles.dealsSection}>
        <div className={styles.dealsHeader}>
          <div className={styles.dealsTitle}>
            Hugocrest Deals <span className={styles.helpIcon}>?</span>
          </div>
        </div>

        <div className={styles.dealsGrid}>
          {deals.map((deal) => (
            <div key={deal.id} className={styles.dealCard}>
              <div className={styles.dealLogo} style={{ backgroundColor: '#f8f7f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 'calc(16px + var(--font-add, 0px))', fontWeight: '700', color: '#047857', textAlign: 'center', padding: '16px' }}>{deal.label}</span>
              </div>
              {deal.badge && <div className={styles.dealBadge}>{deal.badge}</div>}
              <div className={styles.dealInfo}>
                <div className={styles.dealAmount}>{deal.amount}</div>
                <div className={styles.dealExp}>{deal.exp}</div>
                <button
                  className={`${styles.activateBtn} ${activatedDeals[deal.id] ? styles.activated : ''}`}
                  onClick={() => handleActivate(deal.id)}
                >
                  <PlusCircle size={14} color={activatedDeals[deal.id] ? '#28a745' : '#0060a9'} />
                  {activatedDeals[deal.id] ? 'Activated!' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <Link href="/datenschutzerklaerung" className={styles.termsLink}>Terms and Conditions</Link>
      </div>

      {/* ── Disclosures ── */}
      <div className={styles.disclosures}>
        <h3>Account Disclosures</h3>
        <p>Deposit products offered by Hugocrest Bank.</p>
        <p className={styles.equalHousing}>
          <Home size={14} style={{ display: 'inline', marginRight: '4px' }} /> Equal Housing Lender
        </p>
      </div>
    </div>
  );
}
