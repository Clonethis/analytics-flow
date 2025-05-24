import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const WEBSITE_URL = 'https://www.analyticsflow.cz'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${WEBSITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/cenik`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${WEBSITE_URL}/o-nas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${WEBSITE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/podminky`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${WEBSITE_URL}/ochrana-soukromi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${WEBSITE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = []
  
  try {
    const postsDirectory = path.join(process.cwd(), 'data/blog')
    const blogPostFilenames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.md'))
    
    for (const filename of blogPostFilenames) {
      const slug = filename.replace(/\.md$/, '')
      const filePath = path.join(postsDirectory, filename)
      let postDate = new Date()
      
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        if (data.date) {
          postDate = new Date(data.date)
        }
      } catch (e) {
        console.warn(`Could not read frontmatter for ${filename}:`, e)
      }
      
      blogPosts.push({
        url: `${WEBSITE_URL}/blog/${slug}`,
        lastModified: postDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  } catch (error) {
    console.warn('Could not read blog posts directory for sitemap:', error)
  }

  return [...staticPages, ...blogPosts]
}
