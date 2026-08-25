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
    
    // Aggressive Backgrounds Replacements
    css = css.replace(/#0f0a1e/gi, '#ffffff');
    css = css.replace(/#13092a/gi, '#ffffff');
    css = css.replace(/#1a0533/gi, '#ffffff');
    css = css.replace(/#0c0818/gi, '#f9f9f9');
    css = css.replace(/#0f0c22/gi, '#ffffff');
    css = css.replace(/#130d28/gi, '#ffffff');
    css = css.replace(/#2a1060/gi, '#ffffff');
    css = css.replace(/#3d1a80/gi, '#ffffff');
    css = css.replace(/rgba\(19,\s*13,\s*40,\s*0\.9\)/gi, '#ffffff');
    
    // Aggressive Borders Replacements
    css = css.replace(/#2e1f5e/gi, '#eeeeee');
    css = css.replace(/#4c1d95/gi, '#eeeeee');
    css = css.replace(/#2a1d54/gi, '#eeeeee');
    css = css.replace(/rgba\(255,255,255,0\.07\)/gi, '#eeeeee');
    css = css.replace(/rgba\(42,\s*29,\s*84,\s*0\.6\)/gi, '#eeeeee');
    css = css.replace(/rgba\(124,\s*58,\s*237,\s*0\.5\)/gi, '#eeeeee');
    css = css.replace(/rgba\(124,\s*58,\s*237,\s*0\.05\)/gi, '#ffffff');
    css = css.replace(/rgba\(124,\s*58,\s*237,\s*0\.03\)/gi, '#f9f9f9');
    
    // Accents (Purple / Cyan -> Gold)
    css = css.replace(/#05d4f0/gi, '#baa16f');
    css = css.replace(/#7c3aed/gi, '#baa16f');
    css = css.replace(/#6d28d9/gi, '#baa16f');
    css = css.replace(/#a78bfa/gi, '#baa16f');
    css = css.replace(/#4c3980/gi, '#baa16f');
    css = css.replace(/#6a1b9a/gi, '#baa16f');
    
    // Text colors (White -> Dark Gray, Light Purple -> Medium Gray)
    css = css.replace(/color:\s*#fff/gi, 'color: #424242');
    css = css.replace(/color:\s*#ffffff/gi, 'color: #424242');
    css = css.replace(/#e2d9f3/gi, '#666e71');
    css = css.replace(/#5c6494/gi, '#999999');
    css = css.replace(/#b0b8d1/gi, '#666e71');
    css = css.replace(/#7c6fa0/gi, '#666e71');
    css = css.replace(/#c4b5fd/gi, '#666e71');
    
    // Zelle specific colors
    css = css.replace(/#222222/gi, '#424242');
    css = css.replace(/#111111/gi, '#424242');
    css = css.replace(/#555555/gi, '#666e71');
    css = css.replace(/#777777/gi, '#666e71');
    css = css.replace(/#999999/gi, '#999999');
    css = css.replace(/#444444/gi, '#666e71');
    css = css.replace(/#e0e0e0/gi, '#eeeeee');
    css = css.replace(/#f0f0f0/gi, '#eeeeee');
    css = css.replace(/#e8e8e8/gi, '#eeeeee');
    css = css.replace(/#f5f5f5/gi, '#f9f9f9');
    css = css.replace(/#888888/gi, '#cccccc');
    
    // Transparent accents (Purple/Cyan -> Gold transparent)
    css = css.replace(/rgba\(5,\s*212,\s*240/gi, 'rgba(186, 161, 111');
    css = css.replace(/rgba\(124,\s*58,\s*237/gi, 'rgba(186, 161, 111');
    
    // Inject Box Shadows to cards to make them pop on white backgrounds
    css = css.replace(/\.accountCard\s*\{/g, '.accountCard { box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 10px; border-radius: 8px;');
    css = css.replace(/\.dealCard\s*\{/g, '.dealCard { box-shadow: 0 4px 12px rgba(0,0,0,0.05); background-color: #ffffff;');
    
    // Ensure the main app background is slightly off-white so white cards pop
    css = css.replace(/\.dashboardLayout\s*\{([^}]*)\}/g, (match, contents) => {
      // replace background-color if exists
      if (contents.includes('background-color:')) {
        return `.dashboardLayout {${contents.replace(/background-color:\s*[^;]+;/, 'background-color: #f5f5f5;')}}`;
      }
      return `.dashboardLayout {${contents}\n  background-color: #f5f5f5;\n}`;
    });

    // Ensure action tray text is dark
    css = css.replace(/\.actionTrayItem\s*\{([^}]*)\}/g, (match, contents) => {
        return `.actionTrayItem {${contents.replace(/color:\s*[^;]+;/, 'color: #424242;')}}`;
    });

    // Ensure header title is dark
    css = css.replace(/\.pageTitle\s*\{([^}]*)\}/g, (match, contents) => {
        return `.pageTitle {${contents.replace(/color:\s*[^;]+;/, 'color: #424242;')}}`;
    });

    // Strip background gradients completely from specific elements where it breaks the white theme
    css = css.replace(/background:\s*linear-gradient\([^)]+\);/g, (match) => {
      if (match.includes('baa16f')) {
        // Keep gold gradients
        return 'background: #baa16f;';
      }
      return 'background: #ffffff;';
    });

    fs.writeFileSync(filePath, css);
  }
});

console.log('Aggressive UI Revamp Complete!');
