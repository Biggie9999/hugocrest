"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export type Account = {
  id: string;
  name: string;
  balance: number;
  type: string;
  account_number: string;
  status: 'active' | 'frozen' | 'hidden';
};

export type Message = {
  id: string;
  type: 'Alert' | 'Inbox';
  category: string;
  subject: string;
  content: string;
  date: string;
  is_read: boolean;
};

export type Transaction = {
  id: string;
  from_account_id: string;
  to_account_id: string;
  amount: number;
  created_at: string;
  status: string;
  description?: string;
};

interface BankContextType {
  user: User | null;
  profileName: string;
  accounts: Account[];
  transactions: Transaction[];
  messages: Message[];
  transfer: (fromId: string, toId: string, amount: number) => Promise<{ success: boolean; message: string }>;
  addAccount: (name: string, accountNumber: string, externalId?: string) => Promise<string | undefined>;
  markMessageRead: (id: string) => Promise<void>;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profileName, setProfileName] = useState('');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            await fetchUserData(session.user.id, session.user);
          } else {
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error('Failed to get session:', err);
        if (mounted) setIsLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null);
        if (session?.user) {
          try {
            await fetchUserData(session.user.id, session.user);
          } catch (err) {
            console.error('Failed to fetch user data on auth change:', err);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setAccounts([]);
        setTransactions([]);
        setMessages([]);
        setIsLoading(false);
      }
    });

    const timer = setTimeout(() => {
      if (mounted) setIsLoading(false);
    }, 5000);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const fetchUserData = async (userId: string, currentUserObj?: any) => {
    try {
      let currentUser = currentUserObj;
      if (!currentUser) {
        const { data: { session } } = await supabase.auth.getSession();
        currentUser = session?.user;
      }

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('display_name, first_name')
        .eq('id', userId)
        .maybeSingle();
        
      if (profileError) console.error("Profile fetch error:", profileError);
      
      if (!profileData && currentUser) {
        const newDisplayName = currentUser.user_metadata?.first_name || currentUser.user_metadata?.display_name || currentUser.email?.split('@')[0] || 'User';
        await supabase.from('profiles').insert({
          id: userId,
          display_name: newDisplayName,
          first_name: currentUser.user_metadata?.first_name,
          email: currentUser.email,
        });
        setProfileName(newDisplayName.toUpperCase());
      } else if (profileData && profileData.first_name) {
        setProfileName(profileData.first_name.toUpperCase());
      } else if (profileData && profileData.display_name) {
        setProfileName(profileData.display_name.toUpperCase());
      } else if (currentUser?.user_metadata?.first_name) {
        setProfileName(currentUser.user_metadata.first_name.toUpperCase());
      } else {
        setProfileName(currentUser?.email ? currentUser.email.split('@')[0].toUpperCase() : '');
      }

      // Fetch accounts
      const { data: accountsData, error: accountsError } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (accountsError) console.error("Accounts fetch error:", accountsError);

      let finalAccounts = accountsData || [];

      // Self-heal accounts if empty
      if (finalAccounts.length === 0 && currentUser) {
        const newAccNumber = '...' + Math.floor(1000 + Math.random() * 9000).toString();
        const { data: newAcc } = await supabase.from('accounts').insert({
          user_id: userId,
          name: 'PRIME CHECKING',
          balance: 0.00,
          type: 'checking',
          account_number: newAccNumber
        }).select().single();
        if (newAcc) finalAccounts = [newAcc];
      }

      const visibleAccounts = finalAccounts.filter(a => {
        if (a.account_number === '...0000' || a.type === 'external') return false;
        if (!a.name) return true; // prevent error if name is null
        const n = a.name.toUpperCase();
        if (n.includes('TEST - TEST') || n === 'YY' || n.includes('HSBC - AME FRED') || n.includes('BENN - BANK')) return false;
        return true;
      });
      setAccounts(visibleAccounts);

      // Fetch transactions
      const { data: txData, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (txError) console.error("Transactions fetch error:", txError);
      if (txData) setTransactions(txData);

      // Fetch messages
      const { data: msgsData, error: msgsError } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (msgsError) console.error("Messages fetch error:", msgsError);
      if (msgsData) setMessages(msgsData);
    } catch (error) {
      console.error("fetchUserData threw an unexpected error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    if (user) await fetchUserData(user.id, user);
  };

  const markMessageRead = async (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
    await supabase.from('messages').update({ is_read: true }).eq('id', id);
  };

  const transfer = async (fromId: string, toId: string, amount: number) => {
    if (!user) return { success: false, message: 'Not authenticated.' };
    if (amount <= 0) return { success: false, message: 'Amount must be greater than zero.' };

    const fromAccount = accounts.find(a => a.id === fromId);
    if (!fromAccount) return { success: false, message: 'Invalid source account.' };
    if (fromAccount.status === 'frozen') return { success: false, message: 'Account is frozen. Please contact support.' };
    if (fromAccount.type !== 'loan' && fromAccount.balance < amount) return { success: false, message: 'Insufficient funds.' };

    const isExternalTransfer = toId.startsWith('ext-');

    // For internal transfers, validate the to account exists
    let toAccount = accounts.find(a => a.id === toId);
    if (!isExternalTransfer && !toAccount) return { success: false, message: 'Invalid destination account.' };

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Debit from account
    await supabase.from('accounts').update({ balance: fromAccount.balance - amount }).eq('id', fromAccount.id);

    // Credit to account (only for internal transfers)
    if (toAccount && toAccount.type !== 'external') {
      await supabase.from('accounts').update({ balance: toAccount.balance + amount }).eq('id', toAccount.id);
    }

    // Log transaction
    await supabase.from('transactions').insert({
      user_id: user.id,
      from_account_id: fromAccount.id,
      to_account_id: isExternalTransfer ? null : toId,
      amount,
      status: 'completed',
    });

    await refreshData();
    return { success: true, message: 'Transfer successful.' };
  };

  const addAccount = async (name: string, accountNumber: string, externalId?: string): Promise<string | undefined> => {
    if (!user) return undefined;

    const maskedNumber = `...${accountNumber.slice(-4)}`;
    let realId = externalId || `ext-${Date.now()}`;
    
    try {
      const { data } = await supabase.from('accounts').insert({
        user_id: user.id,
        name: name.toUpperCase(),
        balance: 0,
        type: 'external',
        account_number: maskedNumber,
        status: 'active'
      }).select().single();
      
      if (data) {
        realId = data.id;
      }
    } catch (err) {
      console.error('Failed to save external account', err);
    }

    const optimisticAccount: Account = {
      id: realId,
      name: name.toUpperCase(),
      balance: 0,
      type: 'external',
      account_number: maskedNumber,
      status: 'active',
    };

    // Immediately show in UI
    setAccounts(prev => [...prev, optimisticAccount]);

    return realId;
  };

  const signOut = async () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.clear();
      }
      setUser(null);
      setAccounts([]);
      setTransactions([]);
      setMessages([]);
      
      await supabase.auth.signOut({ scope: 'local' });
    } catch (e) {
      console.error('Supabase sign out error', e);
    }
  };

  return (
    <BankContext.Provider value={{ user, accounts, transactions, messages, transfer, addAccount, markMessageRead, isLoading,
        signOut,
        refreshData,
        profileName
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (context === undefined) {
    throw new Error('useBank must be used within a BankProvider');
  }
  return context;
};
