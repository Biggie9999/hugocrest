const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.lienhardt.ch';
const TARGET_DIR = path.join(__dirname, 'src', 'app');
const MAX_PAGES = 50; // Safety limit to avoid infinite crawl

const visited = new Set();
const queue = ['/'];

const escapeHtml = (str) => {
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
};

async function crawl() {
  console.log('Starting full static crawl of Lienhardt.ch...');
  
  let count = 0;

  while (queue.length > 0 && count < MAX_PAGES) {
    const currentPath = queue.shift();
    if (visited.has(currentPath)) continue;
    visited.add(currentPath);

    // Ignore asset paths or wp-admin
    if (currentPath.match(/\.(jpg|png|pdf|css|js|svg)$/i) || currentPath.includes('wp-admin')) {
      continue;
    }

    console.log(`[${count + 1}/${MAX_PAGES}] Fetching ${currentPath}...`);
    try {
      const response = await fetch(`${BASE_URL}${currentPath}`);
      if (!response.ok) {
        console.error(`Failed to fetch ${currentPath}`);
        continue;
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);

      // Rewrite links
      $('a').each((i, el) => {
        let href = $(el).attr('href');
        if (href && href.startsWith(BASE_URL)) {
          // Internal link
          const relativePath = href.substring(BASE_URL.length);
          $(el).attr('href', relativePath);
          
          if (!visited.has(relativePath) && !queue.includes(relativePath)) {
            // Only queue paths without extensions
            if (!relativePath.match(/\.(jpg|png|pdf|css|js|svg)$/i)) {
              queue.push(relativePath);
            }
          }
        }
      });

      // Extract main content
      let mainHtml = $('main#brx-content').html();
      
      // If no main, fallback to body
      if (!mainHtml) {
         $('header#brx-header').remove();
         $('footer#brx-footer').remove();
         mainHtml = $('body').html() || '';
      }

      // Determine file path
      let routePath = currentPath === '/' ? '' : currentPath;
      // Remove trailing slash
      if (routePath.endsWith('/')) {
        routePath = routePath.slice(0, -1);
      }
      
      const dirPath = path.join(TARGET_DIR, routePath);
      const filePath = path.join(dirPath, 'page.js');

      fs.mkdirSync(dirPath, { recursive: true });

      const pageJs = `
export default function Page() {
  return (
    <main id="brx-content" dangerouslySetInnerHTML={{ __html: \`${escapeHtml(mainHtml)}\` }} />
  );
}
      `;
      fs.writeFileSync(filePath, pageJs);
      count++;
    } catch (e) {
      console.error(`Error on ${currentPath}:`, e.message);
    }
  }

  console.log(`Crawl finished. Built ${count} pages locally.`);
}

// Fix Layout.js links
console.log('Fixing links in layout.js...');
const layoutPath = path.join(TARGET_DIR, 'layout.js');
if (fs.existsSync(layoutPath)) {
  let layoutContent = fs.readFileSync(layoutPath, 'utf8');
  // Simple regex to replace hrefs
  layoutContent = layoutContent.replace(/href="https:\/\/www\.lienhardt\.ch([^"]*)"/g, 'href="$1"');
  fs.writeFileSync(layoutPath, layoutContent);
}

crawl();
