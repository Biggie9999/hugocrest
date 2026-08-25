const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src', 'app', '(auth)');
const layoutPath = path.join(targetDir, 'layout.js');
const loginPath = path.join(targetDir, 'login', 'page.js');
const forgotPasswordPath = path.join(targetDir, 'forgot-password', 'page.js');

// 1. Update layout to include responsive CSS rules
let layoutContent = fs.readFileSync(layoutPath, 'utf8');
const responsiveCSS = `
          body, html {
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            font-family: 'Open Sans', sans-serif;
            color: #424242;
          }
          
          /* Responsive adjustments */
          .auth-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            background-color: #ffffff;
            border-bottom: 1px solid #eeeeee;
          }
          
          .auth-footer {
            display: flex;
            justify-content: center;
            padding: 40px;
            background-color: #ffffff;
            border-top: 1px solid #eeeeee;
          }
          
          .footer-inner {
            width: 100%;
            max-width: 600px;
            display: flex;
            gap: 50px;
          }
          
          .auth-main {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 80px;
            padding-bottom: 80px;
          }

          @media (max-width: 768px) {
            .auth-header {
              flex-direction: column;
              align-items: center;
              padding: 20px;
              gap: 20px;
            }
            .lang-switcher {
              width: 100%;
              justify-content: center;
            }
            .auth-main {
              padding-top: 40px;
              padding-bottom: 40px;
            }
            h1 {
              font-size: 28px !important;
            }
            .auth-footer {
              padding: 30px 20px;
            }
            .footer-inner {
              flex-direction: column;
              gap: 30px;
            }
            .action-buttons {
              flex-direction: column;
              width: 100%;
            }
            .action-buttons button {
              width: 100%;
            }
          }
`;

layoutContent = layoutContent.replace(/body, html \{[\s\S]*?color: #424242;\n          \}/, responsiveCSS);
fs.writeFileSync(layoutPath, layoutContent);

// 2. Helper function to apply responsive classes to JSX
function makeResponsive(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace header inline styles with class
  content = content.replace(/<header style=\{\{\s*display: 'flex',\s*justifyContent: 'space-between',\s*alignItems: 'center',\s*padding: '20px 40px',\s*backgroundColor: '#ffffff',\s*borderBottom: '1px solid #eeeeee'\s*\}\}>/, '<header className="auth-header">');
  
  // Replace language switcher div
  content = content.replace(/<div style=\{\{ fontSize: '14px', color: '#666e71', display: 'flex', gap: '15px' \}\}>/g, '<div className="lang-switcher" style={{ fontSize: "14px", color: "#666e71", display: "flex", gap: "15px" }}>');
  
  // Replace main container
  content = content.replace(/<main style=\{\{\s*flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '80px'(?:, paddingBottom: '80px')?\s*\}\}>/g, '<main className="auth-main">');
  
  // Replace footer
  content = content.replace(/<footer style=\{\{\s*display: 'flex',\s*justifyContent: 'center',\s*padding: '40px',\s*backgroundColor: '#ffffff',\s*borderTop: '1px solid #eeeeee'\s*\}\}>/, '<footer className="auth-footer">');
  content = content.replace(/<div style=\{\{ width: '100%', maxWidth: '600px', display: 'flex', gap: '50px' \}\}>/g, '<div className="footer-inner">');

  // Replace action buttons container
  content = content.replace(/<div style=\{\{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '10px' \}\}>/g, '<div className="action-buttons" style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "10px" }}>');
  content = content.replace(/<div style=\{\{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' \}\}>/g, '<div className="action-buttons" style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>');

  fs.writeFileSync(filePath, content);
}

makeResponsive(loginPath);
makeResponsive(forgotPasswordPath);

console.log('Mobile responsiveness applied successfully.');
