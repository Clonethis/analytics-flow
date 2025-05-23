// pages/api/sitemap.xml.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { globby } from 'globby';
import { writeFileSync } from 'fs';
import path from 'path';

// Set your website URL here
const WEBSITE_URL = 'https://www.analyticsflow.cz';

// Function to generate sitemap entries from your pages
const generateSitemap = async (): Promise<SitemapEntry[]> => {
  // Get all page.{js,ts,jsx,tsx} files inside the app directory, excluding API routes, _*, etc.
  const pages = await globby([
    'app/**/page.{js,ts,jsx,tsx}',
    '!app/_*/**', // Exclude directories starting with _ (e.g. _app, _document, _components, _lib)
    '!app/api/**', // Exclude API routes
  ]);

  // Manually add entries for specific pages
  const manualEntries: SitemapEntry[] = [
    { url: `${WEBSITE_URL}/`, lastModified: new Date().toISOString(), changefreq: 'weekly', priority: '1.0' },
    { url: `${WEBSITE_URL}/cenik`, lastModified: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
    { url: `${WEBSITE_URL}/o-nas`, lastModified: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
    { url: `${WEBSITE_URL}/podminky`, lastModified: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
    { url: `${WEBSITE_URL}/ochrana-soukromi`, lastModified: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
    { url: `${WEBSITE_URL}/cookies`, lastModified: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
    { url: `${WEBSITE_URL}/kontakt`, lastModified: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
  ];

  // Generate sitemap entries for pages found by globby
  const staticPagesEntries = pages
    .map((page) => {
      // Transform path to route: app/some/path/page.tsx -> /some/path
      const route = page
        .replace(/^app\//, '') // Remove 'app/' prefix
        .replace(/\/page\.(js|ts|jsx|tsx)$/, '') // Remove '/page.ext'
        .replace(/\/index$/, ''); // Remove '/index' if it's an index page (though less common with 'app' dir)
      
      // Ensure route starts with a slash or is empty (for homepage)
      const finalRoute = route === '' ? '/' : `/${route}`;

      // Avoid duplicating manually added entries
      if (manualEntries.some(entry => entry.url === `${WEBSITE_URL}${finalRoute}`)) {
        return null;
      }
        
      return {
        url: `${WEBSITE_URL}${finalRoute}`,
        lastModified: new Date().toISOString(),
        changefreq: 'weekly', // Default for other pages
        priority: '0.8', // Default for other pages
      };
    })
    .filter(Boolean) as SitemapEntry[]; // Filter out nulls and assert type

  // Combine all entries
  return [...manualEntries, ...staticPagesEntries];
};

// Define the sitemap entry interface
interface SitemapEntry {
  url: string;
  lastModified: string;
  changefreq: string;
  priority: string;
}

// Generate sitemap XML content
const generateSitemapXml = (entries: SitemapEntry[]) => {
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