const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src', 'app');
const authDir = path.join(targetDir, '(auth)');
const forgotPasswordDir = path.join(authDir, 'forgot-password');
const loginPagePath = path.join(authDir, 'login', 'page.js');

if (!fs.existsSync(forgotPasswordDir)) fs.mkdirSync(forgotPasswordDir, { recursive: true });

// 1. Create native Forgot Password Page mimicking the exact UI
const forgotPasswordPage = `
"use client";
import React from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
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
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ width: '100%', maxWidth: '600px', padding: '0 20px' }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: '#666e71',
            marginBottom: '20px' 
          }}>
            User Identification
          </h1>
          <p style={{ fontSize: '16px', color: '#666e71', marginBottom: '40px' }}>
            Please enter your username and click "Continue".
          </p>

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
                  Cancel
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
                Continue
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer Area as seen in the screenshot */}
      <footer style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '40px', 
        backgroundColor: '#ffffff',
        borderTop: '1px solid #eeeeee'
      }}>
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', gap: '50px' }}>
          
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '18px', color: '#666e71', marginBottom: '15px', fontWeight: '600' }}>Informations</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#666e71', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <span>&gt;</span> Security
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <span>&gt;</span> Help
              </li>
            </ul>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ fontSize: '14px', color: '#666e71', fontStyle: 'italic' }}>
              Use of remote support is only possible after contacting the e-banking hotline.
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
              remote support Windows user
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
              remote support Apple user
            </button>
          </div>

        </div>
      </footer>
    </div>
  );
}
`;
fs.writeFileSync(path.join(forgotPasswordDir, 'page.js'), forgotPasswordPage);

// 2. Update login page to link to forgot-password
let loginContent = fs.readFileSync(loginPagePath, 'utf8');

// We need to inject the Link import if it doesn't exist
if (!loginContent.includes("import Link from 'next/link';")) {
  loginContent = loginContent.replace("import React from 'react';", "import React from 'react';\\nimport Link from 'next/link';");
}

// Replace the text span with a Link component
loginContent = loginContent.replace(
  /<span style=\{\{ color: '#baa16f', cursor: 'pointer' \}\}>here<\/span>/g,
  '<Link href="/forgot-password" style={{ color: "#baa16f", textDecoration: "none" }}>here</Link>'
);

fs.writeFileSync(loginPagePath, loginContent);

console.log('Successfully built native forgot password clone locally.');
