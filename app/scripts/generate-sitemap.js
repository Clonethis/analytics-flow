
// scripts/generate-sitemap.js
const { writeFileSync } = require('fs');
const { globby } = require('globby');
const path = require('path');

async function generateSitemap() {
  console.log('Generating sitemap...');
  
  // Use the same logic as in your API route
  const pages = await globby([
    'pages/**/*.{js,ts,jsx,tsx}',
    '!pages/_*.{js,ts,jsx,tsx}',
    '!pages/api',
    '!pages/**/[*',
  ]);

  const WEBSITE_URL = 'https://analyticsflow.cz';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      const route = page
        .replace('pages', '')
        .replace(/\.(js|ts|jsx|tsx)$/, '')
        .replace(/\/index$/, '');
        
      return `
    <url>
      <loc>${WEBSITE_URL}${route === '' ? '/' : route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated!');
}

generateSitemap();