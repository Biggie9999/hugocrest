const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src', 'app');
const authDir = path.join(targetDir, '(auth)');
const loginPagePath = path.join(authDir, 'login', 'page.js');
const forgotPasswordPagePath = path.join(authDir, 'forgot-password', 'page.js');

const dict = `
const translations = {
  de: {
    lang_de: "deutsch",
    lang_fr: "français",
    lang_en: "english",
    lang_it: "italiano",
    login_title: "Login E-Banking",
    contract: "Vertragsnummer",
    password: "Passwort",
    login_btn: "Login",
    forgot: "Passwort vergessen? Bitte hier",
    click: "klicken",
    user_id: "Benutzeridentifikation",
    enter_username: "Bitte geben Sie Ihren Benutzernamen ein und klicken Sie auf 'Weiter'.",
    cancel: "Abbrechen",
    continue: "Weiter",
    info: "Informationen",
    security: "Sicherheit",
    help: "Hilfe",
    remote_text: "Die Nutzung des Fernsupports ist nur nach Kontaktaufnahme mit der E-Banking-Hotline möglich.",
    remote_win: "Fernsupport Windows-Benutzer",
    remote_mac: "Fernsupport Apple-Benutzer"
  },
  fr: {
    lang_de: "allemand",
    lang_fr: "français",
    lang_en: "anglais",
    lang_it: "italien",
    login_title: "Connexion e-banking",
    contract: "Numéro de contrat",
    password: "Mot de passe",
    login_btn: "Connexion",
    forgot: "Mot de passe oublié ? Veuillez",
    click: "cliquer ici",
    user_id: "Identification de l'utilisateur",
    enter_username: "Veuillez saisir votre nom d'utilisateur et cliquer sur 'Continuer'.",
    cancel: "Annuler",
    continue: "Continuer",
    info: "Informations",
    security: "Sécurité",
    help: "Aide",
    remote_text: "L'utilisation du support à distance n'est possible qu'après avoir contacté la hotline e-banking.",
    remote_win: "Support à distance utilisateur Windows",
    remote_mac: "Support à distance utilisateur Apple"
  },
  en: {
    lang_de: "deutsch",
    lang_fr: "français",
    lang_en: "english",
    lang_it: "italiano",
    login_title: "Login E-Banking",
    contract: "Contract Number",
    password: "Password",
    login_btn: "Login",
    forgot: "Forgotten your password? Please click",
    click: "here",
    user_id: "User Identification",
    enter_username: "Please enter your username and click 'Continue'.",
    cancel: "Cancel",
    continue: "Continue",
    info: "Informations",
    security: "Security",
    help: "Help",
    remote_text: "Use of remote support is only possible after contacting the e-banking hotline.",
    remote_win: "remote support Windows user",
    remote_mac: "remote support Apple user"
  },
  it: {
    lang_de: "tedesco",
    lang_fr: "francese",
    lang_en: "inglese",
    lang_it: "italiano",
    login_title: "Login E-Banking",
    contract: "Numero di contratto",
    password: "Password",
    login_btn: "Login",
    forgot: "Hai dimenticato la password? Clicca",
    click: "qui",
    user_id: "Identificazione utente",
    enter_username: "Inserisci il tuo nome utente e clicca su 'Continua'.",
    cancel: "Annulla",
    continue: "Continua",
    info: "Informazioni",
    security: "Sicurezza",
    help: "Aiuto",
    remote_text: "L'utilizzo del supporto remoto è possibile solo dopo aver contattato la hotline e-banking.",
    remote_win: "Supporto remoto utente Windows",
    remote_mac: "Supporto remoto utente Apple"
  }
};
`;

const getLangHeader = () => `
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 40px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #eeeeee'
      }}>
        <img 
          src="https://www.lienhardt.ch/wp-content/uploads/2024/07/logo.svg" 
          alt="Lienhardt & Partner" 
          style={{ width: '250px' }}
        />
        <div style={{ fontSize: '14px', color: '#666e71', display: 'flex', gap: '15px' }}>
          <span onClick={() => setLang('de')} style={{ cursor: 'pointer', fontWeight: lang === 'de' ? '600' : '400' }}>deutsch</span>
          <span onClick={() => setLang('fr')} style={{ cursor: 'pointer', fontWeight: lang === 'fr' ? '600' : '400' }}>français</span>
          <span onClick={() => setLang('en')} style={{ cursor: 'pointer', fontWeight: lang === 'en' ? '600' : '400' }}>english</span>
          <span onClick={() => setLang('it')} style={{ cursor: 'pointer', fontWeight: lang === 'it' ? '600' : '400' }}>italiano</span>
        </div>
      </header>
`;

const loginPageContent = `
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
${dict}

export default function LoginPage() {
  const [lang, setLang] = useState('de');
  const t = translations[lang];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
${getLangHeader()}

      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '80px' }}>
        <div style={{ width: '100%', maxWidth: '600px', padding: '0 20px' }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: '#666e71',
            marginBottom: '40px' 
          }}>
            {t.login_title}
          </h1>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', color: '#666e71' }}>{t.contract}</label>
              <input 
                type="text" 
                style={{ 
                  padding: '12px', 
                  border: '1px solid #cccccc', 
                  borderRadius: '4px',
                  fontSize: '16px',
                  outline: 'none'
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', color: '#666e71' }}>{t.password}</label>
              <input 
                type="password" 
                style={{ 
                  padding: '12px', 
                  border: '1px solid #cccccc', 
                  borderRadius: '4px',
                  fontSize: '16px',
                  outline: 'none'
                }} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button 
                type="button"
                style={{ 
                  backgroundColor: '#9e9e9e', 
                  color: '#ffffff', 
                  padding: '12px 40px', 
                  border: 'none', 
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'not-allowed'
                }}
              >
                {t.login_btn}
              </button>
            </div>
          </form>

          <div style={{ marginTop: '30px', fontSize: '14px', color: '#666e71' }}>
            {t.forgot} <Link href="/forgot-password" style={{ color: '#baa16f', textDecoration: 'none' }}>{t.click}</Link>
          </div>
        </div>
      </main>

      <footer style={{ padding: '40px', textAlign: 'center', fontSize: '14px', color: '#666e71', fontStyle: 'italic' }}>
        {t.remote_text}
      </footer>
    </div>
  );
}
`;

const forgotPasswordPageContent = `
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
${dict}

export default function ForgotPasswordPage() {
  const [lang, setLang] = useState('de');
  const t = translations[lang];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
${getLangHeader()}

      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ width: '100%', maxWidth: '600px', padding: '0 20px' }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: '#666e71',
            marginBottom: '20px' 
          }}>
            {t.user_id}
          </h1>
          <p style={{ fontSize: '16px', color: '#666e71', marginBottom: '40px' }}>
            {t.enter_username}
          </p>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', color: '#666e71' }}>{t.contract}</label>
              <input 
                type="text" 
                style={{ 
                  padding: '12px', 
                  border: '1px solid #cccccc', 
                  borderRadius: '4px',
                  fontSize: '16px',
                  outline: 'none'
                }} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '10px' }}>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <button 
                  type="button"
                  style={{ 
                    backgroundColor: '#717e8b', 
                    color: '#ffffff', 
                    padding: '12px 30px', 
                    border: 'none', 
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  {t.cancel}
                </button>
              </Link>
              <button 
                type="button"
                style={{ 
                  backgroundColor: '#9e9e9e', 
                  color: '#ffffff', 
                  padding: '12px 30px', 
                  border: 'none', 
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'not-allowed'
                }}
              >
                {t.continue}
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '40px', 
        backgroundColor: '#ffffff',
        borderTop: '1px solid #eeeeee'
      }}>
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', gap: '50px' }}>
          
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '18px', color: '#666e71', marginBottom: '15px', fontWeight: '600' }}>{t.info}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#666e71', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <span>&gt;</span> {t.security}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <span>&gt;</span> {t.help}
              </li>
            </ul>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ fontSize: '14px', color: '#666e71', fontStyle: 'italic' }}>
              {t.remote_text}
            </div>
            <button style={{ 
              backgroundColor: '#717e8b', 
              color: '#ffffff', 
              padding: '10px 15px', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              width: 'fit-content'
            }}>
              {t.remote_win}
            </button>
            <button style={{ 
              backgroundColor: '#717e8b', 
              color: '#ffffff', 
              padding: '10px 15px', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              width: 'fit-content'
            }}>
              {t.remote_mac}
            </button>
          </div>

        </div>
      </footer>
    </div>
  );
}
`;

fs.writeFileSync(loginPagePath, loginPageContent);
fs.writeFileSync(forgotPasswordPagePath, forgotPasswordPageContent);

console.log('Language selector is now functional in both auth pages!');
