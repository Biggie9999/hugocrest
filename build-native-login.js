const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src', 'app');
const authDir = path.join(targetDir, '(auth)');
const loginDir = path.join(authDir, 'login');

if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });
if (!fs.existsSync(loginDir)) fs.mkdirSync(loginDir, { recursive: true });

// 1. Create native Auth Layout
const authLayout = `
import "../globals.css";

export const metadata = {
  title: "Login - Bank Lienhardt",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="de-DE">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
        <style>{\`
          body, html {
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            font-family: 'Open Sans', sans-serif;
            color: #424242;
          }
        \`}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
`;
fs.writeFileSync(path.join(authDir, 'layout.js'), authLayout);

// 2. Create native Login Page mimicking the exact UI
const loginPage = `
"use client";
import React from 'react';

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
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
          <span style={{ fontWeight: '600' }}>deutsch</span>
          <span style={{ cursor: 'pointer' }}>français</span>
          <span style={{ cursor: 'pointer' }}>english</span>
          <span style={{ cursor: 'pointer' }}>italiano</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '80px' }}>
        <div style={{ width: '100%', maxWidth: '600px', padding: '0 20px' }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: '#666e71',
            marginBottom: '40px' 
          }}>
            Login E-Banking
          </h1>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', color: '#666e71' }}>Contract Number</label>
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
              <label style={{ fontSize: '14px', color: '#666e71' }}>Password</label>
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
                Login
              </button>
            </div>
          </form>

          <div style={{ marginTop: '30px', fontSize: '14px', color: '#666e71' }}>
            Forgotten your password? Please click <span style={{ color: '#baa16f', cursor: 'pointer' }}>here</span>
          </div>
        </div>
      </main>

      {/* Footer text snippet visible in screenshot */}
      <footer style={{ padding: '40px', textAlign: 'center', fontSize: '14px', color: '#666e71', fontStyle: 'italic' }}>
        Use of remote support is only possible after...
      </footer>
    </div>
  );
}
`;
fs.writeFileSync(path.join(loginDir, 'page.js'), loginPage);

// 3. Fix Layout link back to /login
const layoutPath = path.join(targetDir, '(main)', 'layout.js');
let content = fs.readFileSync(layoutPath, 'utf8');
content = content.replace(/href="\/authen\/ui\/app\/auth\/flow\/ibng\/password"/g, 'href="/login"');
fs.writeFileSync(layoutPath, content);

// 4. Revert next.config.mjs
const nextConfig = `
/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
`;
fs.writeFileSync(path.join(__dirname, 'next.config.mjs'), nextConfig);

console.log('Successfully built native login clone locally.');
