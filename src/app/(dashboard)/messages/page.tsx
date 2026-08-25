"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import styles from './page.module.css';
import { useBank } from '@/context/BankContext';

export default function MessagesPage() {
  const { messages } = useBank();
  const [activeTab, setActiveTab] = useState<'Alert' | 'Inbox'>('Alert');

  const filteredMessages = messages.filter(m => m.type === activeTab);

  return (
    <div className={styles.messagesContainer}>
      <h1 className={styles.pageTitle}>Message Center</h1>
      
      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'Alert' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('Alert')}
        >
          Alerts History
        </button>
        
        <button 
          className={`${styles.tabBtn} ${activeTab === 'Inbox' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('Inbox')}
        >
          Inbox
        </button>
      </div>

      <div className={styles.contentArea}>
        {/* Sort Dropdown */}
        <div className={styles.sortContainer}>
          <div className={styles.sortSelect}>
            <span>Sort By: Received</span>
            <ChevronDown size={16} color="#424242" />
          </div>
        </div>

        {/* Actions Bar */}
        <div className={styles.actionsBar}>
          <div className={styles.actionsText}>Actions</div>
          <Link href="/help" className={styles.contactLink}>Contact us</Link>
        </div>

        {/* Message List */}
        <div className={styles.messageList}>
          {filteredMessages.length === 0 ? (
            <div className={styles.emptyState}>
              {activeTab === 'Alert' ? 'No alerts history available.' : 'No inbox messages available.'}
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div key={msg.id} className={styles.messageItem}>
                <div className={styles.messageContent}>
                  <div className={styles.messageHeader}>
                    <span className={styles.messageSender}>{msg.category}</span>
                    <span className={styles.messageDate}>{msg.date}</span>
                  </div>
                  <div className={styles.messageSubject}>{msg.subject}</div>
                  <div className={styles.messageBody}>{msg.content}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
