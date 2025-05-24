// Advanced Next.js App Router sitemap generation script
// scripts/generate-sitemap.js
const { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } = require('fs');
const { globby } = require('globby');
const path = require('path');
const matter = require('gray-matter');

// Define your website URL - Replace with your actual domain
const WEBSITE_URL = 'https://www.analyticsflow.cz';

// Get last modified date from Git if possible
function getLastModifiedDate(filePath) {
  try {
    // Try to get the last modified date from git
    const { execSync } = require('child_process');
    const gitDate = execSync(`git log -1 --format="%at" -- ${filePath}`).toString().trim();
    
    if (gitDate) {
      // Convert git timestamp to ISO date
      return new Date(parseInt(gitDate) * 1000).toISOString();
    }
  } catch (e) {
    // If git command fails, fall back to file stats
    try {
      const { statSync } = require('fs');
      return new Date(statSync(filePath).mtime).toISOString();
    } catch (err) {
      // If all else fails, use current date
      return new Date().toISOString();
    }
  }
  
  return new Date().toISOString();
}

// Function to read blog posts and generate their sitemap entries
function getBlogPostEntries() {
  const blogDir = path.join(process.cwd(), 'data/blog');
  let blogPostEntries = [];
  
  try {
    const blogFiles = readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    blogPostEntries = blogFiles.map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(blogDir, filename);
      let postDate = new Date().toISOString();
      
      try {
        const fileContents = readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        if (data.date) {
          postDate = new Date(data.date).toISOString();
        }
      } catch (e) {
        console.warn(`Could not read frontmatter for ${filename}:`, e.message);
      }
      
      return {
        url: `${WEBSITE_URL}/blog/${slug}`,
        lastModified: postDate,
        changefreq: 'monthly',
        priority: '0.6'
      };
    });
    
    console.log(`Found ${blogPostEntries.length} blog posts`);
  } catch (error) {
    console.warn('Could not read blog posts directory:', error.message);
  }
  
  return blogPostEntries;
}

async function generateSitemap() {
  console.log('Generating sitemap...');
  
  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }
  
  // Get all pages in your app directory
  const pages = await globby([
    'app/**/page.{js,ts,jsx,tsx}',
    '!app/api/**',        // Exclude API routes
    '!app/_*/**',         // Exclude private folders (starting with underscore)
    '!**/_*/**',          // Exclude any private folders at any level
    '!**/node_modules/**' // Exclude node_modules
  ]);
  
  // Get blog post entries
  const blogPostEntries = getBlogPostEntries();
  
  // Optional: Additional static routes you want to include
  const additionalRoutes = [
    '/cenik',
    '/o-nas',
    '/podminky',
    '/ochrana-soukromi', 
    '/cookies',
    '/kontakt'
  ];
  
  // Generate sitemap entries for static pages
  const staticPagesEntries = pages
    .map((page) => {
      // Skip dynamic route templates like [slug].js
      if (page.includes('[') && page.includes(']')) {
        return null;
      }
      
      // Process the path to get the actual route
      const route = page
        .replace(/^app/, '')                     // Remove leading 'app' directory
        .replace(/\/page\.(js|ts|jsx|tsx)$/, '') // Remove page.{ext} filename
        .replace(/\/\([^)]+\)/g, '')            // Remove route groups (directories in parentheses)
        .replace(/^\/?$/, '/');                 // Handle root route
      
      const filePath = path.join(process.cwd(), page);
      const lastModified = getLastModifiedDate(filePath);
      
      // Set specific priorities and change frequencies for different pages
      let priority = '0.8';
      let changefreq = 'weekly';
      
      if (route === '/') {
        priority = '1.0';
        changefreq = 'weekly';
      } else if (route === '/blog') {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (route === '/kontakt') {
        priority = '0.8';
        changefreq = 'monthly';
      } else if (['/cenik', '/o-nas'].includes(route)) {
        priority = '0.7';
        changefreq = 'monthly';
      } else if (['/podminky', '/ochrana-soukromi', '/cookies'].includes(route)) {
        priority = '0.3';
        changefreq = 'yearly';
      }
      
      return {
        url: `${WEBSITE_URL}${route === '/' ? '' : route}`,
        lastModified: lastModified,
        changefreq: changefreq,
        priority: priority,
      };
    })
    .filter(Boolean); // Remove null entries (skipped dynamic routes)
  
  // Generate entries for additional routes (in case some pages aren't detected)
  const additionalRoutesEntries = additionalRoutes
    .filter(route => {
      // Only add if not already present in static pages
      return !staticPagesEntries.some(entry => entry.url.endsWith(route));
    })
    .map((route) => {
      let priority = '0.5';
      let changefreq = 'monthly';
      
      if (route === '/kontakt') {
        priority = '0.8';
      } else if (['/cenik', '/o-nas'].includes(route)) {
        priority = '0.7';
      } else if (['/podminky', '/ochrana-soukromi', '/cookies'].includes(route)) {
        priority = '0.3';
        changefreq = 'yearly';
      }
      
      return {
        url: `${WEBSITE_URL}${route}`,
        lastModified: new Date().toISOString(),
        changefreq: changefreq,
        priority: priority,
      };
    });
  
  // Combine all entries and remove duplicates
  const allEntries = [
    ...staticPagesEntries,
    ...blogPostEntries,
    ...additionalRoutesEntries
  ];
  
  // Use a Map to ensure URL uniqueness, preferring entries with higher priority
  const uniqueEntriesMap = new Map();
  
  allEntries.forEach(entry => {
    const existing = uniqueEntriesMap.get(entry.url);
    if (!existing || parseFloat(entry.priority) > parseFloat(existing.priority)) {
      uniqueEntriesMap.set(entry.url, entry);
    }
  });
  
  const uniqueEntries = Array.from(uniqueEntriesMap.values());
  
  // Sort entries by URL for consistency
  uniqueEntries.sort((a, b) => a.url.localeCompare(b.url));
  
  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueEntries
  .map((entry) => {
    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  // Write sitemap to public directory
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  writeFileSync(sitemapPath, sitemap);
  
  console.log(`Sitemap generated and saved to ${sitemapPath}`);
  console.log(`Found ${uniqueEntries.length} unique URLs:`);
  console.log(`- ${staticPagesEntries.length} static pages`);
  console.log(`- ${blogPostEntries.length} blog posts`);
  console.log(`- ${additionalRoutesEntries.length} additional routes`);
  
  // Also create/update robots.txt to reference the sitemap
  const robotsPath = path.join(publicDir, 'robots.txt');
  let robotsContent = '';
  
  if (existsSync(robotsPath)) {
    // Read existing robots.txt
    robotsContent = readFileSync(robotsPath, 'utf8');
    // Check if Sitemap is already defined
    if (!robotsContent.includes('Sitemap:')) {
      robotsContent += `\n\nSitemap: ${WEBSITE_URL}/sitemap.xml\n`;
    }
  } else {
    // Create new robots.txt
    robotsContent = `User-agent: *
Allow: /

Sitemap: ${WEBSITE_URL}/sitemap.xml
`;
  }
  
  writeFileSync(robotsPath, robotsContent);
  console.log(`robots.txt updated/created at ${robotsPath}`);
}

// Execute the function
generateSitemap().catch(console.error);
