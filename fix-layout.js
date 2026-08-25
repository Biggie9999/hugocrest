const fs = require('fs');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.lienhardt.ch';
const html = fs.readFileSync('original.html', 'utf8');
const $ = cheerio.load(html);

// Extract parts
const headHtml = $('head').html() || '';

// For header and footer, we rewrite `<a>` tags but NOT `<link>` or `<script>` tags
const headerEl = $('header#brx-header');
headerEl.find('a').each((i, el) => {
  let href = $(el).attr('href');
  if (href && href.startsWith(BASE_URL)) {
    $(el).attr('href', href.substring(BASE_URL.length));
  }
});
const headerHtml = headerEl.prop('outerHTML') || '';

const mainHtml = $('main#brx-content').html() || '';

const footerEl = $('footer#brx-footer');
footerEl.find('a').each((i, el) => {
  let href = $(el).attr('href');
  if (href && href.startsWith(BASE_URL)) {
    $(el).attr('href', href.substring(BASE_URL.length));
  }
});
const footerHtml = footerEl.prop('outerHTML') || '';

// Extract all other scripts/divs in body (like modals, offcanvas, wpdm logic)
$('header#brx-header').remove();
$('main#brx-content').remove();
$('footer#brx-footer').remove();

// Don't rewrite asset links in restOfBody!
const restOfBody = $('body').html() || '';
const bodyClasses = $('body').attr('class') || '';

const escapeHtml = (str) => {
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
};

const layoutJs = `
import "./globals.css";
import ScriptInjector from "./ScriptInjector";

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
        
        <ScriptInjector />
      </body>
    </html>
  );
}
`;

fs.writeFileSync('src/app/layout.js', layoutJs);
console.log('Fixed layout.js to preserve asset URLs!');
