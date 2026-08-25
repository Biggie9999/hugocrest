
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
    login_title: "Login E-Banking",
    contract: "E-Mail Adresse",
    password: "Passwort",
    login_btn: "Login",
    forgot: "Passwort vergessen? Bitte hier",
    click: "klicken",
    error_invalid: "Ungültige E-Mail oder Passwort.",
    logging_in: "Einloggen..."
  },
  fr: {
    lang_de: "allemand",
    lang_fr: "français",
    lang_en: "anglais",
    lang_it: "italien",
    login_title: "Connexion e-banking",
    contract: "Adresse e-mail",
    password: "Mot de passe",
    login_btn: "Connexion",
    forgot: "Mot de passe oublié ? Veuillez",
    click: "cliquer ici",
    error_invalid: "E-mail ou mot de passe incorrect.",
    logging_in: "Connexion..."
  },
  en: {
    lang_de: "deutsch",
    lang_fr: "français",
    lang_en: "english",
    lang_it: "italiano",
    login_title: "Login E-Banking",
    contract: "Email Address",
    password: "Password",
    login_btn: "Login",
    forgot: "Forgotten your password? Please click",
    click: "here",
    error_invalid: "Invalid email or password.",
    logging_in: "Logging in..."
  },
  it: {
    lang_de: "tedesco",
    lang_fr: "francese",
    lang_en: "inglese",
    lang_it: "italiano",
    login_title: "Login E-Banking",
    contract: "Indirizzo e-mail",
    password: "Password",
    login_btn: "Login",
    forgot: "Hai dimenticato la password? Clicca",
    click: "qui",
    error_invalid: "E-mail o password non validi.",
    logging_in: "Accesso..."
  }
};


export default function LoginPage() {
  const [lang, setLang] = useState('de');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = translations[lang];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(t.error_invalid);
      setIsLoading(false);
      return;
    }

    router.push('/dashboard');
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
          <span onClick={() => setLang('fr')} style={{ cursor: 'pointer', fontWeight: lang === 'fr' ? '600' : '400' }}>français</span>
          <span onClick={() => setLang('en')} style={{ cursor: 'pointer', fontWeight: lang === 'en' ? '600' : '400' }}>english</span>
          <span onClick={() => setLang('it')} style={{ cursor: 'pointer', fontWeight: lang === 'it' ? '600' : '400' }}>italiano</span>
        </div>
      </header>


      <main className="auth-main">
        <div style={{ width: '100%', maxWidth: '600px', padding: '0 20px' }}>
          <h1 style={{ 
            fontSize: 'calc(36px + var(--font-add, 0px))', 
            fontWeight: '600', 
            color: '#666e71',
            marginBottom: '40px' 
          }}>
            {t.login_title}
          </h1>

          {error && (
            <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: 'calc(14px + var(--font-add, 0px))' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71' }}>{t.contract}</label>
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
                  outline: 'none'
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
                  outline: 'none'
                }} 
              />
            </div>

            <div className="action-buttons" style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={handleLogin}
                  disabled={isLoading}
                  style={{ 
                    backgroundColor: '#047857', 
                    color: 'white', 
                    padding: '12px 24px', 
                    borderRadius: '4px', 
                    border: 'none', 
                    fontSize: 'calc(14px + var(--font-add, 0px))', 
                    fontWeight: '600', 
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                    minWidth: '120px'
                  }}
                >
                  {isLoading ? t.logging_in : t.login_btn}
                </button>
                <button 
                  type="button"
                  onClick={() => router.push('/enroll')}
                  disabled={isLoading}
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: '#047857', 
                    padding: '12px 24px', 
                    borderRadius: '4px', 
                    border: '1px solid #047857', 
                    fontSize: 'calc(14px + var(--font-add, 0px))', 
                    fontWeight: '600', 
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                    minWidth: '120px'
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>

          <div style={{ marginTop: '30px', fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71' }}>
            {t.forgot} <Link href="/forgot-password" style={{ color: '#047857', textDecoration: 'none' }}>{t.click}</Link>
          </div>
        </div>
      </main>

      <footer style={{ padding: '40px', textAlign: 'center', fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71', fontStyle: 'italic' }}>
        Die Nutzung des Fernsupports ist nur nach Kontaktaufnahme mit der E-Banking-Hotline möglich.
      </footer>
    </div>
  );
}
