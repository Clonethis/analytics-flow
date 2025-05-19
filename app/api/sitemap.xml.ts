// pages/api/sitemap.xml.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { globby } from 'globby';
import { writeFileSync } from 'fs';
import path from 'path';

// Set your website URL here
const WEBSITE_URL = 'https://analyticsflow.cz';

// Function to generate sitemap entries from your pages
const generateSitemap = async () => {
  // Get all .js|.tsx|.ts files inside the pages directory, excluding API routes, _app, _document, etc.
  const pages = await globby([
    'pages/**/*.{js,ts,jsx,tsx}',
    '!pages/_*.{js,ts,jsx,tsx}',
    '!pages/api',
    '!pages/**/[*',  // Exclude dynamic routes for now (we'll handle them separately)
  ]);

  // Add any dynamic routes or additional URLs here
//   const dynamicRoutes = [
//     // Example: '/blog/article-1',
//     // Example: '/products/product-123',
//   ];

  // Generate sitemap entries for static pages
  const staticPagesEntries = pages
    .map((page) => {
      // Remove 'pages' and file extension to get the actual route
      const route = page
        .replace('pages', '')
        .replace(/\.(js|ts|jsx|tsx)$/, '')
        .replace(/\/index$/, '');
        
      return {
        url: `${WEBSITE_URL}${route === '' ? '/' : route}`,
        lastModified: new Date().toISOString(),
        // Add changefreq and priority if needed
        changefreq: 'weekly',
        priority: route === '' ? '1.0' : '0.8',
      };
    });

  // Generate sitemap entries for dynamic routes
//   const dynamicRoutesEntries = dynamicRoutes.map((route) => {
//     return {
//       url: `${WEBSITE_URL}${route}`,
//       lastModified: new Date().toISOString(),
//       changefreq: 'weekly',
//       priority: '0.7',
//     };
//   });

  // Combine all entries
//   return [...staticPagesEntries, ...dynamicRoutesEntries];
};

// Generate sitemap XML content
const generateSitemapXml = (entries) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries
    .map((entry) => {
      return `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${entry.lastModified}</lastmod>
      <changefreq>${entry.changefreq}</changefreq>
      <priority>${entry.priority}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Generate sitemap entries
    const sitemapEntries = await generateSitemap();
    
    // Generate sitemap XML
    const sitemap = generateSitemapXml(sitemapEntries);
    
    // Set headers
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    // Send the sitemap
    res.status(200).send(sitemap);
    
    // Optionally: Save the sitemap to a file in your public directory
    // writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}