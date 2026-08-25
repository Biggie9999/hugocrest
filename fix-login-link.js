const fs = require('fs');
const path = require('path');

const layoutPath = path.join(__dirname, 'src', 'app', '(main)', 'layout.js');
let content = fs.readFileSync(layoutPath, 'utf8');

// Replace all instances of href="/login" with the correct Angular route
content = content.replace(/href="\/login"/g, 'href="/authen/ui/app/auth/flow/ibng/password"');

fs.writeFileSync(layoutPath, content);
console.log('Fixed login link in layout.js');
