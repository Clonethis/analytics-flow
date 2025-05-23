// pages/api/sitemap.xml.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { globby } from 'globby';
import fs from 'fs'; // Added import
import path from 'path';
import matter from 'gray-matter'; // Added import

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
    // The main /blog page will be picked by globby if it's app/blog/page.tsx
    // If its priority/changefreq needs to be different, it can be added here and excluded from globby,
    // or its entry can be found in staticPagesEntries and modified.
    // For now, assuming globby handles /blog correctly with default priority 0.8.
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

      // Avoid duplicating manually added entries if they are already in manualEntries
      if (manualEntries.some(entry => entry.url === `${WEBSITE_URL}${finalRoute}`)) {
        return null;
      }
        
      return {
        url: `${WEBSITE_URL}${finalRoute}`,
        lastModified: new Date().toISOString(),
        // For /blog page, if picked by globby, default priority will be 0.8 and changefreq weekly.
        // This can be adjusted if needed by finding it in the array or adding it manually.
        changefreq: finalRoute === '/blog' ? 'weekly' : 'weekly', // Example: specific for /blog
        priority: finalRoute === '/blog' ? '0.7' : '0.8',         // Example: specific for /blog
      };
    })
    .filter(Boolean) as SitemapEntry[]; // Filter out nulls (skipped posts)

  // Add individual blog post URLs
  const postsDirectory = path.join(process.cwd(), 'data/blog');
  let blogPostFilenames: string[] = [];
  try {
    blogPostFilenames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.md'));
  } catch (error) {
    console.warn("Could not read blog posts directory for sitemap:", error);
    // Continue without blog posts if directory is not found
  }

  const blogPostEntries = blogPostFilenames.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, filename);
    let postDate = new Date().toISOString(); // Default to now if no date found
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents); // Only need frontmatter for date
      if (data.date) {
        postDate = new Date(data.date).toISOString();
      }
    } catch (e) {
      console.warn(`Could not read frontmatter for sitemap date: ${filename}`, e);
    }

    return {
      url: `${WEBSITE_URL}/blog/${slug}`,
      lastModified: postDate,
      changefreq: 'monthly',
      priority: '0.6',
    } as SitemapEntry;
  });
  
  // Combine all entries. Use a Map to ensure URL uniqueness, preferring manual/static entries if conflicts.
  const allEntriesMap = new Map<string, SitemapEntry>();

  manualEntries.forEach(entry => allEntriesMap.set(entry.url, entry));
  staticPagesEntries.forEach(entry => {
    if (!allEntriesMap.has(entry.url)) { // Avoid overwriting manual entries
      allEntriesMap.set(entry.url, entry);
    }
  });
  blogPostEntries.forEach(entry => {
    if (!allEntriesMap.has(entry.url)) { // Avoid overwriting manual or static (e.g. /blog itself)
      allEntriesMap.set(entry.url, entry);
    }
  });

  return Array.from(allEntriesMap.values());
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