
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    remote_text: "Remote support is only available after contacting the e-banking hotline.",
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


export default function ForgotPasswordPage() {
  const [lang, setLang] = useState('en');
  const router = useRouter();
  const t = translations[lang];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <header className="auth-header">
        <img 
          src="/wp-content/uploads/2024/07/Pages-logo-8.webp" 
          alt="Hugocrest" 
          style={{ width: '250px' }}
        />
        
      </header>


      <main className="auth-main">
        <div style={{ width: '100%', maxWidth: '600px', padding: '0 20px' }}>
          <h1 style={{ 
            fontSize: 'calc(36px + var(--font-add, 0px))', 
            fontWeight: '600', 
            color: '#666e71',
            marginBottom: '20px' 
          }}>
            {t.user_id}
          </h1>
          <p style={{ fontSize: 'calc(16px + var(--font-add, 0px))', color: '#666e71', marginBottom: '40px' }}>
            {t.enter_username}
          </p>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71' }}>{t.contract}</label>
              <input 
                type="text" 
                style={{ 
                  padding: '12px', 
                  border: '1px solid #cccccc', 
                  borderRadius: '4px',
                  fontSize: 'calc(16px + var(--font-add, 0px))',
                  outline: 'none'
                }} 
              />
            </div>

            <div className="action-buttons" style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "10px" }}>
              <Link href="/login" style={{ textDecoration: "none" }}><button type="button" style={{ backgroundColor: "transparent", color: "#666e71", padding: "12px 30px", border: "1px solid #cccccc", borderRadius: "4px", fontSize: 'calc(16px + var(--font-add, 0px))', cursor: "pointer" }}>{t.cancel}</button></Link>
              <button onClick={() => router.push('/dashboard')} type="button" style={{ backgroundColor: "#047857", color: "#ffffff", padding: "12px 30px", border: "none", borderRadius: "4px", fontSize: 'calc(16px + var(--font-add, 0px))', cursor: "pointer" }}>{t.continue}</button>
            </div>
          </form>
        </div>
      </main>

      <footer className="auth-footer">
        <div className="footer-inner">
          
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 'calc(18px + var(--font-add, 0px))', color: '#666e71', marginBottom: '15px', fontWeight: '600' }}>{t.info}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#666e71', fontSize: 'calc(14px + var(--font-add, 0px))', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <span>&gt;</span> {t.security}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <span>&gt;</span> {t.help}
              </li>
            </ul>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ fontSize: 'calc(14px + var(--font-add, 0px))', color: '#666e71', fontStyle: 'italic' }}>
              {t.remote_text}
            </div>
            <button style={{ 
              backgroundColor: '#717e8b', 
              color: '#ffffff', 
              padding: '10px 15px', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: 'calc(14px + var(--font-add, 0px))',
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
              fontSize: 'calc(14px + var(--font-add, 0px))',
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
