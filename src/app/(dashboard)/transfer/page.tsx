"use client";

import { useState } from 'react';
import { ChevronRight, X, CheckCircle, Globe } from 'lucide-react';
import styles from './page.module.css';
import Link from 'next/link';
import { useBank, Account } from '@/context/BankContext';

export default function TransferPage() {
  const { accounts, transfer, addAccount, isLoading } = useBank();
  const [fromAccount, setFromAccount] = useState<Account | null>(null);
  const [toAccount, setToAccount] = useState<Account | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<{
    fromName: string;
    fromNumber: string;
    toName: string;
    toNumber: string;
    amount: number;
    date: string;
    refNumber: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [activeModal, setActiveModal] = useState<'from' | 'to' | 'addAccount' | 'international' | null>(null);
  
  const [newBankName, setNewBankName] = useState('');
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountNumber, setNewAccountNumber] = useState('');

  // International transfer fields
  const [intlSwiftCode, setIntlSwiftCode] = useState('');
  const [intlBankName, setIntlBankName] = useState('');
  const [intlAccountName, setIntlAccountName] = useState('');
  const [intlCountry, setIntlCountry] = useState('');
  const [intlAccountNumber, setIntlAccountNumber] = useState('');

  const closeModal = () => setActiveModal(null);

  const handleSelectFrom = (account: Account) => {
    setFromAccount(account);
    if (toAccount?.id === account.id) setToAccount(null);
    closeModal();
  };

  const handleSelectTo = (account: Account) => {
    setToAccount(account);
    if (fromAccount?.id === account.id) setFromAccount(null);
    closeModal();
  };

  const handleTransfer = async () => {
    setError(null);
    if (!fromAccount || !toAccount) {
      setError('Please select both From and To accounts.');
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    // Save details before clearing
    const receiptData = {
      fromName: fromAccount.name,
      fromNumber: fromAccount.account_number,
      toName: toAccount.name,
      toNumber: toAccount.account_number,
      amount: numAmount,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      refNumber: `LNH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    };

    setIsProcessing(true);
    try {
      const result = await transfer(fromAccount.id, toAccount.id, numAmount);
      if (result.success) {
        setSuccessReceipt(receiptData);
        setFromAccount(null);
        setToAccount(null);
        setAmount('');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred processing your transfer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddAccount = async () => {
    if (!newBankName || !newAccountName || !newAccountNumber || newAccountNumber.length < 4) {
      alert("Please provide Bank Name, Account Name, and Account Number (at least 4 digits).");
      return;
    }
    const displayName = `${newBankName.toUpperCase()} - ${newAccountName}`;
    const maskedNumber = `...${newAccountNumber.slice(-4)}`;
    const extId = `ext-${Date.now()}`;
    const realId = await addAccount(displayName, newAccountNumber, extId);
    // Auto-select the newly added account as "To"
    setToAccount({
      id: realId || extId,
      name: displayName,
      balance: 0,
      type: 'checking',
      account_number: maskedNumber,
      status: 'active',
    });
    setNewBankName('');
    setNewAccountName('');
    setNewAccountNumber('');
    closeModal();
  };

  const handleInternationalTransfer = async () => {
    if (!intlBankName) {
      alert('Please enter the bank name.');
      return;
    }
    if (!intlAccountName) {
      alert('Please enter the recipient account name.');
      return;
    }
    if (!intlSwiftCode || intlSwiftCode.length < 8) {
      alert('Please enter a valid SWIFT/BIC code (8-11 characters).');
      return;
    }
    if (!intlAccountNumber || intlAccountNumber.length < 4) {
      alert('Please enter a valid IBAN / Account Number.');
      return;
    }
    const maskedNumber = `...${intlAccountNumber.slice(-4)}`;
    const extId = `ext-${Date.now()}`;
    // Combine bank name and account name so it parses correctly in transaction history
    const displayName = `${intlBankName.toUpperCase()} - ${intlAccountName}`;
    const realId = await addAccount(displayName, intlAccountNumber, extId);
    // Auto-select the newly added account as "To"
    setToAccount({
      id: realId || extId,
      name: displayName,
      balance: 0,
      type: 'checking',
      account_number: maskedNumber,
      status: 'active',
    });
    setIntlSwiftCode('');
    setIntlBankName('');
    setIntlAccountName('');
    setIntlCountry('');
    setIntlAccountNumber('');
    closeModal();
  };

  if (isLoading) return null;

  if (successReceipt) {
    return (
      <div className={styles.transferContainer} style={{ paddingTop: '40px' }}>
        {/* Receipt Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <CheckCircle size={64} color="#2e7d32" style={{ margin: '0 auto', display: 'block' }} />
          <h1 style={{ fontSize: 'calc(22px + var(--font-add, 0px))', fontWeight: '600', color: '#424242', marginTop: '16px' }}>Transfer Successful</h1>
          <p style={{ fontSize: 'calc(13px + var(--font-add, 0px))', color: '#999', marginTop: '4px' }}>{successReceipt.date}</p>
        </div>

        {/* Receipt Card */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          {/* Amount Banner */}
          <div style={{ background: 'linear-gradient(135deg, #047857 0%, #d4b97a 100%)', padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: 'calc(12px + var(--font-add, 0px))', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Amount Transferred</div>
            <div style={{ fontSize: 'calc(36px + var(--font-add, 0px))', fontWeight: '300', color: '#fff', letterSpacing: '-0.5px' }}>£{successReceipt.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>

          {/* Details */}
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: 'calc(13px + var(--font-add, 0px))', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>From</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 'calc(14px + var(--font-add, 0px))', fontWeight: '600', color: '#424242' }}>{successReceipt.fromName}</div>
                <div style={{ fontSize: 'calc(12px + var(--font-add, 0px))', color: '#999' }}>{successReceipt.fromNumber}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: 'calc(13px + var(--font-add, 0px))', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>To</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 'calc(14px + var(--font-add, 0px))', fontWeight: '600', color: '#424242' }}>{successReceipt.toName}</div>
                <div style={{ fontSize: 'calc(12px + var(--font-add, 0px))', color: '#999' }}>{successReceipt.toNumber}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: 'calc(13px + var(--font-add, 0px))', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Reference</span>
              <span style={{ fontSize: 'calc(13px + var(--font-add, 0px))', fontWeight: '600', color: '#424242', fontFamily: 'monospace', letterSpacing: '0.5px' }}>{successReceipt.refNumber}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: 'calc(13px + var(--font-add, 0px))', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</span>
              <span style={{ fontSize: 'calc(13px + var(--font-add, 0px))', fontWeight: '500', color: '#424242' }}>{successReceipt.date}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0' }}>
              <span style={{ fontSize: 'calc(13px + var(--font-add, 0px))', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</span>
              <span style={{ fontSize: 'calc(13px + var(--font-add, 0px))', fontWeight: '700', color: '#2e7d32', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2e7d32', display: 'inline-block' }} />
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button 
            onClick={() => setSuccessReceipt(null)} 
            style={{ flex: 1, backgroundColor: '#047857', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontSize: 'calc(15px + var(--font-add, 0px))', fontWeight: '600', cursor: 'pointer' }}
          >
            Make Another Transfer
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: 'calc(11px + var(--font-add, 0px))', color: '#999', marginTop: '16px', lineHeight: '1.5' }}>
          Hugocrest Hugocrest Bank Zürich AG · This receipt serves as confirmation of your transfer.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.transferContainer}>
      <h1 className={styles.pageTitle}>Transfer Money</h1>
      
      {error && (
        <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: 'calc(14px + var(--font-add, 0px))' }}>
          {error}
        </div>
      )}

      <div className={styles.selectionGroup}>
        {/* From Account */}
        <div className={styles.selectRow} onClick={() => setActiveModal('from')}>
          <div className={styles.selectText}>
            {fromAccount ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className={styles.selectedAccount}>{fromAccount.name}</span>
                <span style={{ fontSize: 'calc(12px + var(--font-add, 0px))', color: '#666e71', marginTop: '2px' }}>
                  Balance: £{Math.abs(fromAccount.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            ) : (
              <span className={styles.placeholder}>From which account?</span>
            )}
          </div>
          <div className={styles.iconCircle}>
            <ChevronRight size={20} color="#555" />
          </div>
        </div>

        {/* To Account */}
        <div className={styles.selectRow} onClick={() => setActiveModal('to')}>
          <div className={styles.selectText}>
            {toAccount ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className={styles.selectedAccount}>{toAccount.name}</span>
                <span style={{ fontSize: 'calc(12px + var(--font-add, 0px))', color: '#666e71', marginTop: '2px' }}>
                  {(toAccount.type === 'external' || toAccount.id.startsWith('ext-')) ? `Account Number: ${toAccount.account_number || 'Unknown'}` : `Balance: £${Math.abs(toAccount.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                </span>
              </div>
            ) : (
              <span className={styles.placeholder}>To which account?</span>
            )}
          </div>
          <div className={styles.iconCircle}>
            <ChevronRight size={20} color="#555" />
          </div>
        </div>

        {/* Amount Input */}
        <div className={styles.selectRow} style={{ borderBottom: 'none' }}>
          <div className={styles.selectText} style={{ width: '100%' }}>
            <div style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71', marginBottom: '8px' }}>Amount (£)</div>
            <input 
              type="number" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: 'calc(24px + var(--font-add, 0px))', color: '#424242', backgroundColor: 'transparent' }}
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleTransfer}
        disabled={isProcessing || !fromAccount || !toAccount || !amount}
        style={{ width: '100%', marginTop: '24px', backgroundColor: isProcessing || !fromAccount || !toAccount || !amount ? '#cccccc' : '#047857', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '16px', fontSize: 'calc(16px + var(--font-add, 0px))', fontWeight: 'bold', cursor: isProcessing || !fromAccount || !toAccount || !amount ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }}
      >
        {isProcessing ? 'Processing Transfer...' : 'Review Transfer'}
      </button>

      <div className={styles.addAccountLinkWrapper} style={{ marginTop: '24px' }}>
        <button 
          onClick={() => setActiveModal('addAccount')} 
          className={styles.addAccountLink}
          style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
        >
          Add Non-Hugocrest Account
        </button>
      </div>

      <div className={styles.internationalBanner} onClick={() => setActiveModal('international')}>
        <div className={styles.internationalBannerLeft}>
          <div className={styles.internationalIconWrap}>
            <Globe size={20} color="#047857" />
          </div>
          <div>
            <div className={styles.internationalTitle}>Make International Transfer</div>
            <div className={styles.internationalSubtitle}>Send money to any bank worldwide via SWIFT</div>
          </div>
        </div>
        <ChevronRight size={20} color="#047857" />
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <>
          <div className={styles.modalOverlay} onClick={closeModal} />
          <div className={styles.modalSheet}>
            <div className={styles.modalHeader}>
              <h2>{activeModal === 'international' ? 'International Transfer' : 'Select Account'}</h2>
              <button className={styles.closeBtn} onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              {activeModal === 'international' ? (
                <div style={{ padding: '20px' }}>
                  <div className={styles.intlBadge}>
                    <Globe size={16} />
                    <span>SWIFT / International Wire</span>
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Bank Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Deutsche Bank, HSBC" 
                      value={intlBankName}
                      onChange={(e) => setIntlBankName(e.target.value)}
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Account Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe, ACME Corp" 
                      value={intlAccountName}
                      onChange={(e) => setIntlAccountName(e.target.value)}
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>SWIFT / BIC Code</label>
                    <input 
                      type="text" 
                      placeholder="e.g. UBSWCHZH80A" 
                      value={intlSwiftCode}
                      onChange={(e) => setIntlSwiftCode(e.target.value.toUpperCase())}
                      maxLength={11}
                      className={styles.fieldInput}
                      style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
                    />
                    <span className={styles.fieldHint}>8 or 11 characters</span>
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>IBAN / Account Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. DE89 3704 0044 0532 0130 00" 
                      value={intlAccountNumber}
                      onChange={(e) => setIntlAccountNumber(e.target.value)}
                      className={styles.fieldInput}
                    />
                  </div>

                  <button 
                    onClick={handleInternationalTransfer}
                    className={styles.intlSubmitBtn}
                  >
                    <Globe size={18} style={{ marginRight: '8px' }} />
                    Add International Account
                  </button>

                  <p className={styles.intlDisclaimer}>
                    International transfers may take 1–3 business days. Standard SWIFT fees apply.
                  </p>
                </div>
              ) : activeModal === 'addAccount' ? (
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: 'calc(12px + var(--font-add, 0px))', color: '#666e71', marginBottom: '4px' }}>Bank Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. UBS, Credit Suisse" 
                      value={newBankName}
                      onChange={(e) => setNewBankName(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: 'calc(12px + var(--font-add, 0px))', color: '#666e71', marginBottom: '4px' }}>Account Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe" 
                      value={newAccountName}
                      onChange={(e) => setNewAccountName(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: 'calc(12px + var(--font-add, 0px))', color: '#666e71', marginBottom: '4px' }}>Account Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 123456789" 
                      value={newAccountNumber}
                      onChange={(e) => setNewAccountNumber(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none' }}
                    />
                  </div>
                  <button 
                    onClick={handleAddAccount}
                    style={{ width: '100%', backgroundColor: '#047857', color: '#fff', border: 'none', padding: '14px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Link Account
                  </button>
                </div>
              ) : (
                <>
                  {[...accounts].filter(a => a.status !== 'hidden').map(account => (
                    <div 
                      key={account.id}
                      className={styles.modalOption}
                      onClick={() => activeModal === 'from' ? handleSelectFrom(account) : handleSelectTo(account)}
                      style={{ opacity: (activeModal === 'from' && toAccount?.id === account.id) || (activeModal === 'to' && fromAccount?.id === account.id) ? 0.5 : 1 }}
                    >
                      <div className={styles.accountName}>{account.name}</div>
                      <div className={styles.accountDetails}>
                        {account.account_number} {account.type === 'external' ? '' : `(${account.type === 'loan' ? 'Outstanding' : 'Available'}: £${Math.abs(account.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })})`}
                      </div>
                    </div>
                  ))}

                  <div className={styles.addNonWFOption} onClick={() => setActiveModal('addAccount')}>
                    <span className={styles.addNonWFText}>Add external account</span>
                    <ChevronRight size={20} color="#555" />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
