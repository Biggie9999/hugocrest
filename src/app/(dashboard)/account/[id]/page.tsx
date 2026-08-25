"use client";

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Search, Download, Filter } from 'lucide-react';
import Link from 'next/link';
import { useBank } from '@/context/BankContext';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

type DisplayTransaction = {
  id: string;
  date: string;
  fullDate: string;
  description: string;
  subDesc: string;
  counterpartyNumber?: string;
  type: 'credit' | 'debit';
  amount: number;
  status: 'completed' | 'pending';
  refNumber: string;
};

// Mock transaction data for a Swiss private bank
const mockTransactions: DisplayTransaction[] = [
  { id: 't1', date: '2026-05-29', fullDate: '2026-05-29T08:14:00', refNumber: 'LNH-X1Y2-9F9A', description: 'Salary Deposit', subDesc: 'Novartis International AG - Payroll', type: 'credit', amount: 12500.00, status: 'completed' },
  { id: 't2', date: '2026-05-28', fullDate: '2026-05-28T14:32:00', refNumber: 'LNH-B2K4-1Z7Q', description: 'Wire Transfer Out', subDesc: 'UBS AG - Wealth Management', type: 'debit', amount: 3200.00, status: 'completed' },
  { id: 't3', date: '2026-05-27', fullDate: '2026-05-27T09:00:00', refNumber: 'LNH-C3L5-2X8W', description: 'Standing Order', subDesc: 'Swiss Life - Insurance Premium', type: 'debit', amount: 450.00, status: 'completed' },
  { id: 't4', date: '2026-05-26', fullDate: '2026-05-26T11:45:00', refNumber: 'LNH-D4M6-3C9E', description: 'SEPA Transfer Received', subDesc: 'Deutsche Bank AG - Frankfurt', type: 'credit', amount: 8750.00, status: 'completed' },
  { id: 't5', date: '2026-05-25', fullDate: '2026-05-25T16:20:00', refNumber: 'LNH-E5N7-4V0R', description: 'Card Payment', subDesc: 'Sprüngli - Bahnhofstrasse', type: 'debit', amount: 86.50, status: 'completed' },
  { id: 't6', date: '2026-05-24', fullDate: '2026-05-24T12:10:00', refNumber: 'LNH-F6P8-5B1T', description: 'ATM Withdrawal', subDesc: 'Paradeplatz ATM - Zürich', type: 'debit', amount: 500.00, status: 'completed' },
  { id: 't7', date: '2026-05-23', fullDate: '2026-05-23T10:05:00', refNumber: 'LNH-G7Q9-6N2Y', description: 'Investment Dividend', subDesc: 'Nestlé SA - Q2 2026 Dividend', type: 'credit', amount: 1340.00, status: 'completed' },
  { id: 't8', date: '2026-05-22', fullDate: '2026-05-22T08:30:00', refNumber: 'LNH-H8R0-7M3U', description: 'Mortgage Payment', subDesc: 'Hugocrest - Hypothek', type: 'debit', amount: 2100.00, status: 'completed' },
  { id: 't9', date: '2026-05-21', fullDate: '2026-05-21T15:55:00', refNumber: 'LNH-I9S1-8A4I', description: 'International Wire', subDesc: 'HSBC London - GBP Conversion', type: 'debit', amount: 5600.00, status: 'pending' },
  { id: 't10', date: '2026-05-20', fullDate: '2026-05-20T23:59:00', refNumber: 'LNH-J0T2-9S5O', description: 'Interest Credit', subDesc: 'Monthly Interest - Savings Tier 3', type: 'credit', amount: 215.75, status: 'completed' },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr.includes('T') ? dateStr : dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(dateStr: string): string {
  if (!dateStr.includes('T')) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function AccountHistoryPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { accounts, transactions, isLoading } = useBank();
  const [search, setSearch] = useState('');
  const [selectedTxn, setSelectedTxn] = useState<DisplayTransaction | null>(null);

  const account = accounts.find(a => a.id === id);

  // Convert real Supabase transactions into display format
  const [realTransactions, setRealTransactions] = useState<DisplayTransaction[]>([]);

  React.useEffect(() => {
    let isMounted = true;
    if (!transactions || !id) {
      if (isMounted) setRealTransactions([]);
      return;
    }

    const loadTxns = async () => {
      const txns = transactions.filter(t => t.from_account_id === id || t.to_account_id === id);
      const displayTxns: DisplayTransaction[] = [];

      for (const t of txns) {
        const isDebit = t.from_account_id === id;
        const otherAccountId = isDebit ? t.to_account_id : t.from_account_id;
        
        let otherName = 'External Account';
        let otherNumber = undefined;

        if (otherAccountId) {
          const acc = accounts.find(a => a.id === otherAccountId);
          if (acc) {
            otherName = acc.name;
            otherNumber = acc.account_number;
          } else {
            // Attempt to resolve external/unfiltered accounts from DB directly
            try {
              const { data } = await supabase.from('accounts').select('name, account_number').eq('id', otherAccountId).maybeSingle();
              if (data) {
                otherName = data.name;
                otherNumber = data.account_number;
              }
            } catch (err) {
              console.error('Error fetching counterparty account', err);
            }
          }
        }

        const desc = t.description || (isDebit ? 'Transfer Out' : 'Transfer In');
        displayTxns.push({
          id: t.id,
          date: t.created_at.split('T')[0],
          fullDate: t.created_at,
          refNumber: `LNH-${t.id.substring(0, 8).toUpperCase()}`,
          description: desc,
          subDesc: otherName,
          counterpartyNumber: otherNumber,
          type: isDebit ? 'debit' : 'credit',
          amount: t.amount,
          status: (t.status === 'completed' ? 'completed' : 'pending'),
        });
      }

      if (isMounted) {
        setRealTransactions(displayTxns);
      }
    };

    loadTxns();

    return () => { isMounted = false; };
  }, [transactions, id, accounts]);

  // Merge real + mock (only add mock for the demo accounts)
  const allTransactions = useMemo(() => {
    const combined = [...realTransactions];
    if (id === 'acc_1' || id === 'acc_2' || id === 'acc_3') {
      combined.push(...mockTransactions);
    }
    combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return combined;
  }, [realTransactions, id]);

  const filteredTxns = useMemo(() => {
    if (!search.trim()) return allTransactions;
    const q = search.toLowerCase();
    return allTransactions.filter(t =>
      t.description.toLowerCase().includes(q) ||
      t.subDesc.toLowerCase().includes(q) ||
      t.amount.toString().includes(q)
    );
  }, [search, allTransactions]);

  if (isLoading) return null;

  if (!account) {
    return (
      <div className={styles.container}>
        <Link href="/dashboard" className={styles.backBar}>
          <ArrowLeft size={18} /> Back to Accounts
        </Link>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🏦</div>
          <p>Account not found</p>
        </div>
      </div>
    );
  }

  const isLoan = account.type === 'loan';

  return (
    <div className={styles.container}>
      {/* Back */}
      <Link href="/dashboard" className={styles.backBar}>
        <ArrowLeft size={18} /> Back to Accounts
      </Link>

      {/* Account Header */}
      <div className={styles.accountHeader}>
        <div className={styles.accountMeta}>
          <div>
            <h1 className={styles.accountName}>{account.name}</h1>
            <div className={styles.accountNumber}>{account.account_number}</div>
          </div>
          <span className={styles.accountType}>
            {account.type === 'checking' ? 'Checking' : account.type === 'savings' ? 'Savings' : 'Loan'}
          </span>
        </div>
        <div className={styles.balanceBlock}>
          <span className={styles.balanceLabel}>{isLoan ? 'Outstanding' : 'Available'}</span>
        </div>
        <div className={styles.balanceBlock} style={{ marginTop: '4px' }}>
          <span className={styles.currency}>£</span>
          <span className={styles.balanceAmount}>
            {Math.abs(account.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} color="#999" />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className={styles.toolBtn} title="Filter">
          <Filter size={16} color="#666e71" />
        </button>
        <button className={styles.toolBtn} title="Download Statement">
          <Download size={16} color="#666e71" />
        </button>
      </div>

      {/* Transaction Table */}
      <div className={styles.tableWrap}>
        <div className={styles.sectionTitle}>Recent Transactions</div>
        {filteredTxns.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No transactions match your search.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHead}>
                <th>Date</th>
                <th className={styles.hideOnMobile}>Description</th>
                <th>Type</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map(txn => (
                <tr key={txn.id} className={styles.tableRow} onClick={() => setSelectedTxn(txn)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div className={styles.txDate}>{formatDate(txn.date)}</div>
                    <div className={styles.txTime}>{formatTime(txn.fullDate)}</div>
                  </td>
                  <td className={styles.hideOnMobile}>
                    <div className={styles.txDesc}>{txn.description}</div>
                    <div className={styles.txSubDesc}>{txn.subDesc}</div>
                  </td>
                  <td>
                    <div className={`${styles.txType} ${txn.type === 'credit' ? styles.typeCredit : styles.typeDebit}`}>
                      {txn.type === 'credit' ? '↓ Credit' : '↑ Debit'}
                    </div>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <span className={`${styles.statusDot} ${txn.status === 'completed' ? styles.statusCompleted : styles.statusPending}`} />
                    <span className={styles.statusText}>
                      {txn.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className={txn.type === 'credit' ? styles.amountCredit : styles.amountDebit}>
                    {txn.type === 'credit' ? '+' : '−'} £{txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className={styles.modalOverlay} onClick={() => setSelectedTxn(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedTxn(null)}>✕</button>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Transaction Details</h2>
            </div>
            <div className={styles.receiptDetails}>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>Ref Number</span>
                <span className={styles.receiptValue}>{selectedTxn.refNumber}</span>
              </div>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>Description</span>
                <span className={styles.receiptValue}>{selectedTxn.description}</span>
              </div>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>{selectedTxn.type === 'debit' ? 'Transferred To' : 'Received From'}</span>
                <span className={styles.receiptValue} style={{ color: '#0060a9', fontWeight: 'bold' }}>{selectedTxn.subDesc}</span>
              </div>
              {selectedTxn.counterpartyNumber && (
                <div className={styles.receiptRow}>
                  <span className={styles.receiptLabel}>{selectedTxn.type === 'debit' ? 'Recipient Account' : 'Sender Account'}</span>
                  <span className={styles.receiptValue}>{selectedTxn.counterpartyNumber}</span>
                </div>
              )}
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>Transfer Method</span>
                <span className={styles.receiptValue}>Electronic Transfer</span>
              </div>
              {selectedTxn.subDesc.includes(' - ') && (
                <>
                  <div className={styles.receiptRow}>
                    <span className={styles.receiptLabel}>Counterparty Bank</span>
                    <span className={styles.receiptValue}>{selectedTxn.subDesc.split(' - ')[0]}</span>
                  </div>
                  <div className={styles.receiptRow}>
                    <span className={styles.receiptLabel}>Counterparty Name</span>
                    <span className={styles.receiptValue}>{selectedTxn.subDesc.split(' - ')[1]}</span>
                  </div>
                </>
              )}
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>Date & Time</span>
                <span className={styles.receiptValue}>
                  {new Date(selectedTxn.fullDate).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>Status</span>
                <span className={styles.receiptValue} style={{ textTransform: 'capitalize', color: selectedTxn.status === 'completed' ? '#2e7d32' : '#f59e0b', fontWeight: 600 }}>
                  {selectedTxn.status}
                </span>
              </div>
              <div className={styles.receiptRow}>
                <span className={styles.receiptLabel}>Type</span>
                <span className={styles.receiptValue} style={{ textTransform: 'capitalize' }}>{selectedTxn.type}</span>
              </div>
              <div className={styles.receiptRow} style={{ borderBottom: 'none', paddingTop: '8px' }}>
                <span className={styles.receiptLabel} style={{ fontWeight: 600 }}>Amount</span>
                <span className={styles.receiptValue} style={{ fontSize: 'calc(20px + var(--font-add, 0px))', color: selectedTxn.type === 'credit' ? '#2e7d32' : '#c62828' }}>
                  {selectedTxn.type === 'credit' ? '+' : '−'} £{selectedTxn.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
