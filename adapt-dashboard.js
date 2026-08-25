const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const dashboardDir = path.join(__dirname, 'src', 'app', '(dashboard)');

walkDir(dashboardDir, (filePath) => {
  if (filePath.endsWith('.css')) {
    let css = fs.readFileSync(filePath, 'utf8');
    
    // Backgrounds
    css = css.replace(/#0c0818/gi, '#f9f9f9');
    css = css.replace(/#0f0c22/gi, '#ffffff');
    css = css.replace(/#130d28/gi, '#ffffff');
    css = css.replace(/#2a1060/gi, '#ffffff');
    css = css.replace(/#3d1a80/gi, '#ffffff');
    css = css.replace(/rgba\(19,\s*13,\s*40,\s*0\.9\)/gi, '#ffffff');
    
    // Borders
    css = css.replace(/#2a1d54/gi, '#eeeeee');
    css = css.replace(/rgba\(255,255,255,0\.07\)/gi, '#eeeeee');
    css = css.replace(/rgba\(42,\s*29,\s*84,\s*0\.6\)/gi, '#eeeeee');
    css = css.replace(/rgba\(124,\s*58,\s*237,\s*0\.5\)/gi, '#eeeeee');
    
    // Accents (Purple / Cyan -> Gold)
    css = css.replace(/#05d4f0/gi, '#baa16f');
    css = css.replace(/#7c3aed/gi, '#baa16f');
    css = css.replace(/#6d28d9/gi, '#baa16f');
    
    // Text colors
    css = css.replace(/#fff/gi, '#424242');
    css = css.replace(/#ffffff/gi, '#424242');
    css = css.replace(/#e2d9f3/gi, '#666e71');
    css = css.replace(/#5c6494/gi, '#999999');
    css = css.replace(/#b0b8d1/gi, '#666e71');
    
    // Transparent accents
    css = css.replace(/rgba\(5,\s*212,\s*240/gi, 'rgba(186, 161, 111');
    css = css.replace(/rgba\(124,\s*58,\s*237/gi, 'rgba(186, 161, 111');
    
    // Fonts
    css = css.replace(/font-family:\s*'Inter'/gi, "font-family: 'Open Sans'");
    
    fs.writeFileSync(filePath, css);
  }
  
  if (filePath.endsWith('layout.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace Ally Logo with Lienhardt Logo
    content = content.replace(
      /<div className=\{styles\.logo\}>ALLY FINANCIAL<\/div>/g, 
      '<img src="https://www.lienhardt.ch/wp-content/uploads/2024/07/logo.svg" alt="Lienhardt" style={{ width: "200px" }} />'
    );
    // Remove the explicit text-transform and background-clip CSS from the logo style usage if any, but since it's an img it won't matter much.
    fs.writeFileSync(filePath, content);
  }
});

// Update the Login Page to route to /dashboard
const loginPath = path.join(__dirname, 'src', 'app', '(auth)', 'login', 'page.js');
let loginContent = fs.readFileSync(loginPath, 'utf8');
loginContent = loginContent.replace(
  /<button\s+type="button"\s+style=\{\{\s*backgroundColor:\s*'#9e9e9e',[\s\S]*?cursor:\s*'not-allowed'\s*\}\}\s*>\s*\{t\.login_btn\}\s*<\/button>/m,
  '<Link href="/dashboard" style={{ textDecoration: "none" }}><button type="button" style={{ backgroundColor: "#baa16f", color: "#ffffff", padding: "12px 40px", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer" }}>{t.login_btn}</button></Link>'
);
fs.writeFileSync(loginPath, loginContent);

// Also update Forgot Password continue button just in case
const forgotPath = path.join(__dirname, 'src', 'app', '(auth)', 'forgot-password', 'page.js');
let forgotContent = fs.readFileSync(forgotPath, 'utf8');
forgotContent = forgotContent.replace(
  /<button\s+type="button"\s+style=\{\{\s*backgroundColor:\s*'#9e9e9e',[\s\S]*?cursor:\s*'not-allowed'\s*\}\}\s*>\s*\{t\.continue\}\s*<\/button>/m,
  '<Link href="/dashboard" style={{ textDecoration: "none" }}><button type="button" style={{ backgroundColor: "#baa16f", color: "#ffffff", padding: "12px 30px", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer" }}>{t.continue}</button></Link>'
);
fs.writeFileSync(forgotPath, forgotContent);

console.log('Dashboard adapted to Lienhardt styling and linked to login.');
