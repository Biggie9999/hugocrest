"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, DollarSign, Menu, LogOut, X, ChevronRight } from 'lucide-react';
import styles from './layout.module.css';
import { useState, useEffect } from 'react';
import { BankProvider, useBank } from '@/context/BankContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif", margin: 0 }}>
        <BankProvider>
          <DashboardShell>{children}</DashboardShell>
        </BankProvider>
      </body>
    </html>
  );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, profileName, isLoading, signOut } = useBank();

  useEffect(() => {
    if (!isLoading && !user && pathname !== '/admin') {
      window.location.href = '/login';
    }
  }, [user, isLoading, pathname, router]);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    try {
      // Fire and forget so we don't hang the UI if the network is slow
      signOut().catch(console.error);
    } catch (e) {
      console.error('Logout error', e);
    }
    // Instantly navigate
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff', color: '#047857' }}>
        Loading...
      </div>
    );
  }

  if (!user && pathname !== '/admin') return null;

  return (
        <div className={styles.dashboardLayout}>
            <header className={styles.header}>
              <img src="https://www.hugocrest.com/wp-content/uploads/2024/07/logo.svg" alt="Hugocrest" style={{ width: "200px" }} />
            </header>

            <main className={styles.mainContent}>
              {children}
            </main>

            {/* Slide-out Menu */}
            {isMenuOpen && (
              <div className={styles.slideOutMenu}>
                <div className={styles.menuHeader}>
                  <span className={styles.menuTitle}>Menu</span>
                  <button onClick={() => setIsMenuOpen(false)} className={styles.closeBtn}><X size={24} color="#666" /></button>
                </div>
                
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className={styles.profileSection}>
                  <div className={styles.profileAvatar}>
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                     </svg>
                  </div>
                  <div className={styles.profileInfo}>
                    <div className={styles.profileName}>{profileName}</div>
                    <div className={styles.profileSub}>Profile, settings, messages, access...</div>
                  </div>
                  <ChevronRight size={20} color="#047857" />
                </Link>

                <ul className={styles.menuLinks}>
                  <Link href="/transfer-pay" className={styles.menuLinkItem} onClick={() => setIsMenuOpen(false)}>
                    <div className={styles.menuItemText}>
                      <strong>Transfer &amp; Pay</strong>
                      <span>Pay bills, pay WF accounts, deposit, transfer...</span>
                    </div>
                    <ChevronRight size={20} color="#047857" />
                  </Link>
                  <Link href="/credit-cards" className={styles.menuLinkItem} onClick={() => setIsMenuOpen(false)}>
                    <div className={styles.menuItemText}>
                      <strong>Cards</strong>
                      <span>Turn on or off, replace, digital wallet, deals...</span>
                    </div>
                    <ChevronRight size={20} color="#047857" />
                  </Link>

                  {user?.email === 'admin@gmail.com' && (
                    <Link href="/admin" className={styles.menuLinkItem} onClick={() => setIsMenuOpen(false)}>
                      <div className={styles.menuItemText}>
                        <strong style={{ color: '#d32f2f' }}>Admin Panel</strong>
                        <span>Manage users, balances, and transactions</span>
                      </div>
                      <ChevronRight size={20} color="#047857" />
                    </Link>
                  )}

                  <Link href="/education" className={styles.menuLinkItem} onClick={() => setIsMenuOpen(false)}>
                    <div className={styles.menuItemText}>
                      <strong>Financial Planning</strong>
                      <span>ZEK Score, debt-to-income, spending report</span>
                    </div>
                    <ChevronRight size={20} color="#047857" />
                  </Link>

                  <Link href="/help" className={styles.menuLinkItem} onClick={() => setIsMenuOpen(false)}>
                    <div className={styles.menuItemText}>
                      <strong>Help &amp; Support</strong>
                      <span>Locations, FAQs, make an appointment...</span>
                    </div>
                    <ChevronRight size={20} color="#047857" />
                  </Link>
                </ul>

                <div className={styles.menuFooter}>
                  <Link href="/datenschutzerklaerung" onClick={() => setIsMenuOpen(false)}>Privacy, Cookies, Security &amp; Legal</Link>
                  <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', background: 'none', border: '1px solid #047857', color: '#047857', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%', justifyContent: 'center', fontWeight: 'bold' }}>
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Navigation */}
            {pathname !== '/admin' && (
              <nav className={styles.bottomNav}>
                <Link href="/dashboard" className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}>
                  <Home size={24} />
                  <span>Accounts</span>
                </Link>
                <Link href="/transfer" className={`${styles.navItem} ${pathname === '/transfer' ? styles.active : ''}`}>
                  <DollarSign size={24} />
                  <span>Transfer</span>
                </Link>

                <button className={styles.navItem} onClick={() => setIsMenuOpen(true)}>
                  <Menu size={24} />
                  <span>Menu</span>
                </button>
              </nav>
            )}
        </div>
  );
}
