"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useBank } from '@/context/BankContext';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

// Transaction type configuration: label shown in dropdown, and whether it adds or subtracts from balance
const TXN_TYPES: Record<string, { label: string; direction: 'credit' | 'debit' }> = {
  transfer_in:     { label: 'Transfer In',     direction: 'credit' },
  transfer_out:    { label: 'Transfer Out',    direction: 'debit' },
  card_purchase:   { label: 'Card Purchase',   direction: 'debit' },
  mobile_deposit:  { label: 'Mobile Deposit',  direction: 'credit' },
  check_deposit:   { label: 'Check Deposit',   direction: 'credit' },
  wire_in:         { label: 'Wire In',         direction: 'credit' },
  wire_out:        { label: 'Wire Out',        direction: 'debit' },
  atm_withdrawal:  { label: 'ATM Withdrawal',  direction: 'debit' },
  cashapp_in:      { label: 'CashApp In',      direction: 'credit' },
  cashapp_out:     { label: 'CashApp Out',     direction: 'debit' },
  purchase:        { label: 'Purchase',        direction: 'debit' },
};

export default function AdminPage() {
  const { user, refreshData, isLoading } = useBank();
  const router = useRouter();

  const [profiles, setProfiles] = useState<any[]>([]);
  const [allAccounts, setAllAccounts] = useState<any[]>([]);
  
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState('');
  
  const [newBalance, setNewBalance] = useState('');
  
  // Custom Txn State
  const [txnType, setTxnType] = useState('transfer_in');
  const [txnAmount, setTxnAmount] = useState('');
  const [txnDate, setTxnDate] = useState('');
  const [txnDesc, setTxnDesc] = useState('Deposit');
  const [txnCounterparty, setTxnCounterparty] = useState('');
  const [txnStatus, setTxnStatus] = useState('completed');

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // New User State
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserDisplayName, setNewUserDisplayName] = useState('');
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  // Communication Dispatcher State
  const [msgType, setMsgType] = useState('Alert');
  const [msgCategory, setMsgCategory] = useState('Account Update');
  const [msgSubject, setMsgSubject] = useState('');
  const [msgContent, setMsgContent] = useState('');
  const [isSendingMsg, setIsSendingMsg] = useState(false);
  const [userMessages, setUserMessages] = useState<any[]>([]);

  useEffect(() => {
    if (selectedUserId) {
      loadUserMessages();
    } else {
      setUserMessages([]);
    }
  }, [selectedUserId]);

  const loadUserMessages = async () => {
    const { data } = await supabase.from('messages').select('*').eq('user_id', selectedUserId).order('created_at', { ascending: false });
    if (data) setUserMessages(data);
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (!anonSupabase) return;
    const { error } = await anonSupabase.from('messages').delete().eq('id', msgId);
    if (error) {
      showMessage('error', error.message);
    } else {
      showMessage('success', 'Message deleted successfully!');
      loadUserMessages();
    }
  };

  // New Bank Account State
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [newAccUserId, setNewAccUserId] = useState('');
  const [newAccName, setNewAccName] = useState('Checking Account');
  const [newAccType, setNewAccType] = useState('checking');
  const [newAccBalance, setNewAccBalance] = useState('0');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalText, setSuccessModalText] = useState('');

  const [isAdminVerified, setIsAdminVerified] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    if (!isLoading && isAdminVerified) {
      loadAdminData();
    }
  }, [isAdminVerified, isLoading]);

  // 1. Create a fresh, unauthenticated "Anonymous" connection for ALL admin actions
  const [anonSupabase, setAnonSupabase] = useState<any>(null);
  
  useEffect(() => {
    import('@supabase/supabase-js').then(({ createClient }) => {
      const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { auth: { persistSession: false, autoRefreshToken: false } }
      );
      setAnonSupabase(client);
    });
  }, []);

  const loadAdminData = async () => {
    if (!anonSupabase) return;
    try {
      // 2. Fetch the profiles and accounts using the Anonymous connection
      const { data: profs, error: profError } = await anonSupabase
        .from('profiles')
        .select('*');
        
      const { data: accs, error: accError } = await anonSupabase
        .from('accounts')
        .select('*');
      
      if (profError) showMessage('error', `Profile Fetch Error: ${profError.message}`);
      if (accError) showMessage('error', `Accounts Fetch Error: ${accError.message}`);
      
      if (profs) setProfiles(profs);
      if (accs) setAllAccounts(accs);
      
      if (profs && profs.length === 0) {
        showMessage('error', 'Zero profiles returned from database. Check RLS policies!');
      }
    } catch (err: any) {
      showMessage('error', `Unexpected Error: ${err.message}`);
    }
  };

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Admin Panel...</div>;

  if (!isAdminVerified) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
        <h2 style={{ color: '#333', marginBottom: '24px' }}>Admin Verification</h2>
        <p style={{ marginBottom: '24px', color: '#666' }}>Please enter the master admin credentials to access this panel.</p>
        <input 
          type="email" 
          placeholder="Admin Email" 
          value={adminEmail}
          onChange={e => setAdminEmail(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="password" 
          placeholder="Admin Password" 
          value={adminPassword}
          onChange={e => setAdminPassword(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '24px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={() => {
            if (adminEmail.toLowerCase() === 'admin@gmail.com' && adminPassword === 'test') {
              setIsAdminVerified(true);
            } else {
              alert('Invalid admin credentials.');
            }
          }}
          style={{ width: '100%', padding: '12px', background: '#047857', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Unlock Admin Panel
        </button>
      </div>
    );
  }

  const selectedUserAccounts = allAccounts.filter(a => a.user_id === selectedUserId && a.status !== 'hidden' && a.type !== 'external');
  const selectedAccount = allAccounts.find(a => a.id === selectedAccountId);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleUpdateBalance = async () => {
    if (!selectedAccountId || !newBalance || !anonSupabase) return;
    const num = parseFloat(newBalance);
    if (isNaN(num)) return showMessage('error', 'Invalid balance amount');

    const { error } = await anonSupabase.from('accounts').update({ balance: num }).eq('id', selectedAccountId);
    if (error) {
      showMessage('error', error.message);
    } else {
      showMessage('success', 'Balance updated successfully!');
      loadAdminData();
      refreshData();
    }
  };

  const handleToggleFreeze = async () => {
    if (!selectedAccount || !anonSupabase) return;
    const newStatus = selectedAccount.status === 'frozen' ? 'active' : 'frozen';
    const { error } = await anonSupabase.from('accounts').update({ status: newStatus }).eq('id', selectedAccountId);
    if (error) {
      showMessage('error', error.message);
    } else {
      showMessage('success', `Account is now ${newStatus}`);
      loadAdminData();
      refreshData();
    }
  };

  const handleInjectTxn = async () => {
    if (!selectedAccountId || !txnAmount || !anonSupabase) return showMessage('error', 'Missing fields');
    const amt = parseFloat(txnAmount);
    if (isNaN(amt) || amt <= 0) return showMessage('error', 'Invalid amount');

    const txnConfig = TXN_TYPES[txnType];
    if (!txnConfig) return showMessage('error', 'Invalid transaction type');
    const isCredit = txnConfig.direction === 'credit';

    // Create a counterparty account with a proper 10-digit number, or reuse an existing one
    let targetExtId = null;
    if (txnCounterparty) {
       const formattedName = txnCounterparty.toUpperCase();
       const existing = allAccounts.find(a => a.user_id === selectedUserId && a.type === 'external' && a.name === formattedName);
       
       if (existing) {
         targetExtId = existing.id;
       } else {
         const randomAccNum = Array.from({length: 10}, () => Math.floor(Math.random() * 10)).join('');
         const extIdRes = await anonSupabase.from('accounts').insert({
            user_id: selectedUserId,
            name: formattedName,
            balance: 0,
            type: 'external',
            account_number: randomAccNum,
         }).select().single();
         if (extIdRes.data) {
           targetExtId = extIdRes.data.id;
         }
       }
    }

    const payload: any = {
      user_id: selectedUserId,
      from_account_id: isCredit ? targetExtId : selectedAccountId,
      to_account_id: isCredit ? selectedAccountId : targetExtId,
      amount: amt,
      status: txnStatus,
      description: txnConfig.label,
    };

    if (txnDate) {
      payload.created_at = new Date(txnDate).toISOString();
    }

    const { data: insertData, error } = await anonSupabase.from('transactions').insert(payload).select().single();
    
    if (error) {
      showMessage('error', error.message);
    } else {
      // BRUTE FORCE UPDATE: If a custom date was provided, PostgreSQL likely ignored it during the INSERT 
      // and forcefully stamped it with NOW(). We must immediately run an UPDATE to overwrite it.
      if (txnDate && insertData && insertData.id) {
        const { error: updateError } = await anonSupabase
          .from('transactions')
          .update({ created_at: new Date(txnDate).toISOString() })
          .eq('id', insertData.id);
          
        if (updateError) {
          console.error("Failed to brute-force timestamp override:", updateError);
        }
      }

      // Auto-update the account balance
      if (selectedAccount && txnStatus === 'completed') {
        const currentBalance = parseFloat(selectedAccount.balance) || 0;
        const multiplier = isCredit ? 1 : -1;
        await anonSupabase.from('accounts').update({ balance: Number(currentBalance) + (amt * multiplier) }).eq('id', selectedAccountId);
      }
      showMessage('success', `${txnConfig.label} injected! Balance updated.`);
      loadAdminData();
      refreshData();
    }
  };

  const handleCreateUser = async () => {
    if (!newUserEmail || !newUserPassword || !newUserDisplayName) {
      return showMessage('error', 'Email, password, and display name are required');
    }
    if (newUserPassword.length < 6) {
      return showMessage('error', 'Password must be at least 6 characters');
    }
    
    setIsCreatingUser(true);
    const { data, error } = await anonSupabase.auth.signUp({
      email: newUserEmail,
      password: newUserPassword
    });
    
    setIsCreatingUser(false);
    
    if (error) {
      showMessage('error', `Failed to create user: ${error.message}`);
    } else {
      if (data?.user) {
        await anonSupabase.from('profiles').update({ display_name: newUserDisplayName }).eq('id', data.user.id);
      }
      showMessage('success', `User ${newUserEmail} created successfully!`);
      setNewUserEmail('');
      setNewUserPassword('');
      loadAdminData();
    }
  };

  const handleCreateBankAccount = async () => {
    if (!newAccUserId || !newAccName || !newAccType || !anonSupabase) {
      return showMessage('error', 'Please fill in all bank account fields');
    }
    
    setIsCreatingAccount(true);
    const num = parseFloat(newAccBalance || '0');
    
    // Generate a random 10 digit account number
    const randomAccNum = Array.from({length: 10}, () => Math.floor(Math.random() * 10)).join('');
    
    const { error } = await anonSupabase.from('accounts').insert({
      user_id: newAccUserId,
      name: newAccName,
      type: newAccType,
      balance: isNaN(num) ? 0 : num,
      account_number: randomAccNum,
      status: 'active'
    });
    
    setIsCreatingAccount(false);
    
    if (error) {
      showMessage('error', error.message);
    } else {
      setSuccessModalText(`Bank account '${newAccName}' created successfully with balance £${isNaN(num) ? 0 : num}.`);
      setShowSuccessModal(true);
      setNewAccName('Checking Account');
      setNewAccBalance('0');
      loadAdminData();
    }
  };

  const handleSendMessage = async () => {
    if (!selectedUserId || !msgType || !msgCategory || !msgSubject || !msgContent || !anonSupabase) {
      return showMessage('error', 'Please fill in all message fields');
    }
    
    setIsSendingMsg(true);
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    
    const { error } = await anonSupabase.from('messages').insert({
      user_id: selectedUserId,
      type: msgType,
      category: msgCategory,
      subject: msgSubject,
      content: msgContent,
      date: dateStr,
      is_read: false
    });
    
    setIsSendingMsg(false);
    
    if (error) {
      showMessage('error', error.message);
    } else {
      setSuccessModalText('Message dispatched successfully to the user!');
      setShowSuccessModal(true);
      setMsgSubject('');
      setMsgContent('');
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>Global Admin Panel (Live)</h1>
        <p>Manage all users, override balances, and inject transaction history.</p>
        <button 
          onClick={() => {
            loadAdminData();
            showMessage('success', 'Data refreshed from server');
          }}
          className={styles.button}
          style={{ marginTop: '16px' }}
        >
          Refresh Users &amp; Data
        </button>
      </div>

      {message && (
        <div className={`${styles.message} ${message.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
          {message.text}
        </div>
      )}

      <div className={styles.card}>
        <h2>Target Selection</h2>
        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>Select User</label>
            <select className={styles.select} value={selectedUserId} onChange={e => { setSelectedUserId(e.target.value); setSelectedAccountId(''); }}>
              <option value="">-- Choose User --</option>
              {profiles.map(p => (
                <option key={p.id} value={p.id}>{p.display_name} ({p.email})</option>
              ))}
            </select>
          </div>
          <div className={styles.col}>
            <label className={styles.label}>Select Account</label>
            <select className={styles.select} value={selectedAccountId} onChange={e => setSelectedAccountId(e.target.value)} disabled={!selectedUserId}>
              <option value="">-- Choose Account --</option>
              {selectedUserAccounts.map(a => (
                <option key={a.id} value={a.id}>{a.name} (...{a.account_number.slice(-4)})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.card} style={{ marginTop: '24px' }}>
        <h2>Create Bank Account</h2>
        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>Select User</label>
            <select className={styles.select} value={newAccUserId} onChange={e => setNewAccUserId(e.target.value)}>
              <option value="">-- Choose User --</option>
              {profiles.map(p => (
                <option key={p.id} value={p.id}>{p.display_name} ({p.email})</option>
              ))}
            </select>
          </div>
          <div className={styles.col}>
            <label className={styles.label}>Account Name</label>
            <input type="text" className={styles.input} value={newAccName} onChange={e => setNewAccName(e.target.value)} placeholder="e.g. Everyday Checking" />
          </div>
        </div>
        
        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>Account Type</label>
            <select className={styles.select} value={newAccType} onChange={e => setNewAccType(e.target.value)}>
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="credit">Credit Card</option>
              <option value="investment">Investment / Brokerage</option>
              <option value="mortgage">Mortgage / Loan</option>
            </select>
          </div>
          <div className={styles.col}>
            <label className={styles.label}>Initial Balance (£)</label>
            <input type="number" className={styles.input} value={newAccBalance} onChange={e => setNewAccBalance(e.target.value)} placeholder="0" />
          </div>
        </div>
        
        <button 
          className={styles.button} 
          style={{ width: '100%', marginTop: '16px' }} 
          onClick={handleCreateBankAccount}
          disabled={isCreatingAccount || !newAccUserId}
        >
          {isCreatingAccount ? 'Creating Account...' : 'Create Bank Account'}
        </button>
      </div>

      <div className={styles.card} style={{ marginTop: '24px' }}>
        <h2>Create New User</h2>
        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>Display Name</label>
            <input type="text" className={styles.input} value={newUserDisplayName} onChange={e => setNewUserDisplayName(e.target.value)} placeholder="e.g. John Doe" />
          </div>
          <div className={styles.col}>
            <label className={styles.label}>Email Address</label>
            <input type="email" className={styles.input} value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} placeholder="user@example.com" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>Password (Min 6 chars)</label>
            <input type="password" className={styles.input} value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} placeholder="Secret123!" />
          </div>
        </div>
        <button 
          className={styles.button} 
          style={{ width: '100%', marginTop: '16px' }} 
          onClick={handleCreateUser}
          disabled={isCreatingUser}
        >
          {isCreatingUser ? 'Creating...' : 'Create User Account'}
        </button>
      </div>

      {selectedUserId && (
        <div className={styles.card} style={{ marginTop: '24px' }}>
          <h2>Communication Dispatcher</h2>
          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label}>Message Type</label>
              <select className={styles.select} value={msgType} onChange={e => setMsgType(e.target.value)}>
                <option value="Alert">Alert (High Priority)</option>
                <option value="Inbox">Inbox (Standard)</option>
              </select>
            </div>
            <div className={styles.col}>
              <label className={styles.label}>Category</label>
              <input type="text" className={styles.input} value={msgCategory} onChange={e => setMsgCategory(e.target.value)} placeholder="e.g. Security, Account Update" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label}>Subject</label>
              <input type="text" className={styles.input} value={msgSubject} onChange={e => setMsgSubject(e.target.value)} placeholder="Message Subject" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label}>Content</label>
              <textarea 
                className={styles.input} 
                value={msgContent} 
                onChange={e => setMsgContent(e.target.value)} 
                placeholder="Message body..."
                style={{ minHeight: '100px', resize: 'vertical' }}
              />
            </div>
          </div>
          <button 
            className={styles.button} 
            style={{ width: '100%', marginTop: '16px' }} 
            onClick={handleSendMessage}
            disabled={isSendingMsg}
          >
            {isSendingMsg ? 'Dispatching...' : 'Dispatch Message'}
          </button>

          {userMessages.length > 0 && (
            <div style={{ marginTop: '24px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>Manage Active Alerts/Messages</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                {userMessages.map(msg => (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{msg.type} • {msg.category}</div>
                      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{msg.subject}</div>
                      <div style={{ fontSize: '12px', color: '#999' }}>{msg.date}</div>
                    </div>
                    <button 
                      onClick={() => handleDeleteMessage(msg.id)}
                      style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {selectedAccount && (
        <>
          <div className={styles.card}>
            <h2>Account Controls</h2>
            <div className={`${styles.row} ${styles.rowAlignBottom}`}>
              <div className={styles.col}>
                <label className={styles.label}>Set New Balance (£)</label>
                <input type="number" className={styles.input} value={newBalance} onChange={e => setNewBalance(e.target.value)} placeholder={`Current: ${selectedAccount.balance}`} />
              </div>
              <div className={styles.col}>
                <button className={styles.button} onClick={handleUpdateBalance}>Update Balance</button>
              </div>
            </div>

            <div className={`${styles.row} ${styles.rowAlignBottom}`} style={{ marginTop: '24px' }}>
              <div className={styles.col}>
                <label className={styles.label}>Account Status: <strong>{selectedAccount.status.toUpperCase()}</strong></label>
                <p style={{ fontSize: 'calc(12px + var(--font-add, 0px))', color: '#666', marginBottom: '12px' }}>Freezing an account blocks all outgoing transfers and shows a warning banner.</p>
                <button 
                  className={`${styles.button} ${selectedAccount.status === 'frozen' ? styles.buttonSuccess : styles.buttonDanger}`} 
                  onClick={handleToggleFreeze}
                >
                  {selectedAccount.status === 'frozen' ? 'Unfreeze Account' : 'Freeze Account'}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Inject Custom Transaction</h2>
            <div className={styles.row}>
              <div className={styles.col}>
                <label className={styles.label}>Type</label>
                <select className={styles.select} value={txnType} onChange={e => setTxnType(e.target.value)}>
                  {Object.entries(TXN_TYPES).map(([key, cfg]) => (
                    <option key={key} value={key}>
                      {cfg.label} ({cfg.direction === 'credit' ? '+ Add' : '− Subtract'})
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.col}>
                <label className={styles.label}>Amount (£)</label>
                <input type="number" className={styles.input} value={txnAmount} onChange={e => setTxnAmount(e.target.value)} placeholder="e.g. 5000" />
              </div>
            </div>
            
            <div className={styles.row}>
              <div className={styles.col}>
                <label className={styles.label}>Date & Time (Optional)</label>
                <input type="datetime-local" className={styles.input} value={txnDate} onChange={e => setTxnDate(e.target.value)} />
              </div>
              <div className={styles.col}>
                <label className={styles.label}>Status</label>
                <select className={styles.select} value={txnStatus} onChange={e => setTxnStatus(e.target.value)}>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Counterparty Name (e.g., Bank - Person)</label>
              <input type="text" className={styles.input} value={txnCounterparty} onChange={e => setTxnCounterparty(e.target.value)} placeholder="e.g. UBS - John Doe" />
            </div>

            <button className={styles.button} style={{ width: '100%', marginTop: '12px' }} onClick={handleInjectTxn}>Inject Transaction</button>
          </div>
        </>
      )}

      {showSuccessModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ background: '#e8f5e9', color: '#2e7d32', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 'calc(30px + var(--font-add, 0px))' }}>
              ✓
            </div>
            <h2 style={{ marginBottom: '10px', color: '#333' }}>Success!</h2>
            <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.5' }}>{successModalText}</p>
            <button 
              className={styles.button} 
              style={{ width: '100%' }}
              onClick={() => setShowSuccessModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
