// Advanced Next.js App Router sitemap generation script
// scripts/generate-sitemap.js
const { writeFileSync, readFileSync, existsSync, mkdirSync } = require('fs');
const { globby } = require('globby');
const path = require('path');

// Define your website URL - Replace with your actual domain
const WEBSITE_URL = 'https://analyticsflow.cz';

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

// Function to find dynamic route patterns and extract possible paths
async function findDynamicRoutes() {
  // This is a simplified example. In a real app, you would:
  // 1. Read data from your API, database, or content files
  // 2. Extract the actual slugs/IDs that exist in your content
  // 3. Return full URL paths for these dynamic routes
  
  // For simplicity, let's assume you might have blog posts with these slugs:
  const blogSlugs = ['first-post', 'second-post', 'hello-world'];
  
  // Map the slugs to their full URL paths
  return blogSlugs.map(slug => `/blog/${slug}`);
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
  
  // Get dynamic routes - in a real app, you'd replace this with actual data
  const dynamicRoutes = await findDynamicRoutes();
  
  // Optional: Additional static routes you want to include
  const additionalRoutes = [
    '/terms',
    '/privacy',
    // Add any other routes that might not be detected or need special handling
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
      
      return {
        url: `${WEBSITE_URL}${route === '/' ? '' : route}`,
        lastModified: lastModified,
        changefreq: 'weekly',
        priority: route === '/' ? '1.0' : '0.8',
      };
    })
    .filter(Boolean); // Remove null entries (skipped dynamic routes)
  
  // Generate sitemap entries for dynamic routes
  const dynamicRoutesEntries = dynamicRoutes.map((route) => {
    return {
      url: `${WEBSITE_URL}${route}`,
      lastModified: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7',
    };
  });
  
  // Generate entries for additional routes
  const additionalRoutesEntries = additionalRoutes.map((route) => {
    return {
      url: `${WEBSITE_URL}${route}`,
      lastModified: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.5',
    };
  });
  
  // Combine all entries and remove duplicates
  const allEntries = [...staticPagesEntries, ...dynamicRoutesEntries, ...additionalRoutesEntries];
  const uniqueEntries = Array.from(new Map(allEntries.map(entry => [entry.url, entry])).values());
  
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
  console.log(`Found ${uniqueEntries.length} unique URLs`);
  
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
  console.log(`robots.txt saved to ${robotsPath}`);
}

// Execute the function
generateSitemap().catch(console.error);