const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('original.html', 'utf8');
const $ = cheerio.load(html);

// Extract parts
const headHtml = $('head').html() || '';
const headerHtml = $('header#brx-header').prop('outerHTML') || '';
const mainHtml = $('main#brx-content').html() || '';
const footerHtml = $('footer#brx-footer').prop('outerHTML') || '';

// Extract all other scripts/divs in body (like modals, offcanvas, wpdm logic)
$('header#brx-header').remove();
$('main#brx-content').remove();
$('footer#brx-footer').remove();
const restOfBody = $('body').html() || '';
const bodyClasses = $('body').attr('class') || '';

const escapeHtml = (str) => {
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
};

const layoutJs = `
import "./globals.css";

export const metadata = {
  title: "Bank Lienhardt",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de-DE">
      <head>
        {/* We inject the head safely */}
      </head>
      <body className="${escapeHtml(bodyClasses)}">
        <div dangerouslySetInnerHTML={{ __html: \`${escapeHtml(headHtml)}\` }} />
        <div dangerouslySetInnerHTML={{ __html: \`${escapeHtml(headerHtml)}\` }} />
        
        {children}
        
        <div dangerouslySetInnerHTML={{ __html: \`${escapeHtml(footerHtml)}\` }} />
        <div dangerouslySetInnerHTML={{ __html: \`${escapeHtml(restOfBody)}\` }} />
      </body>
    </html>
  );
}
`;

const pageJs = `
export default function Home() {
  return (
    <main id="brx-content" dangerouslySetInnerHTML={{ __html: \`${escapeHtml(mainHtml)}\` }} />
  );
}
`;

fs.writeFileSync('src/app/layout.js', layoutJs);
fs.writeFileSync('src/app/page.js', pageJs);

console.log('Successfully generated perfect clone layout and page!');
