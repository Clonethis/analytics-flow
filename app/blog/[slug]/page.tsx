// app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
// import Image from 'next/image'; // Optional, using img for placeholder consistency
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost } from '@/lib/types'; // Adjust path if needed, ensure BlogPost provides base fields
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs'; // Added import for Breadcrumbs
// Optional: If you plan to use Metadata API
// import type { Metadata, ResolvingMetadata } from 'next';

const postsDirectory = path.join(process.cwd(), 'data/blog');

export async function generateStaticParams() {
  try {
    const filenames = fs.readdirSync(postsDirectory);
    return filenames
      .filter(name => name.endsWith('.md'))
      .map(filename => ({
        slug: filename.replace(/\.md$/, '') 
      }));
  } catch (error) {
    console.error("Static generation error:", error);
    return [];
  }
}

// Define the properties expected in the frontmatter after parsing
// This should align with what your BlogPost type (or its relevant parts) would provide
interface PostFrontmatter {
  title: string;
  date: string; // Or Date, if you parse it immediately
  image?: string;
  categories: string[];
  excerpt?: string;
  author?: string; // Added author
  // Add any other frontmatter fields you expect from BlogPost
}

// Type for the enriched post data including contentHtml
interface FullBlogPost extends PostFrontmatter {
  slug: string;
  contentHtml: string;
  readingTime: string; // Added reading time
  author?: string; // Added author
  tocItems?: { id: string; level: number; text: string }[]; // Added ToC items
}

// Simulating cheerio for HTML parsing and manipulation
const cheerio = {
  load: (htmlString: string) => {
    // Basic Cheerio load simulation
    let _html = htmlString;
    return {
      find: (selector: string) => {
        // Very basic h2/h3 selector simulation
        const elements: { tagName: string; text: () => string; attr: (name: string, value?: string) => void | string; html: () => string | null }[] = [];
        const regex = /<(h[23])(?:[^>]*)>(.*?)<\/\1>/gi;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(_html)) !== null) {
          const tagName = match[1].toLowerCase();
          const textContent = match[2].replace(/<[^>]*>/g, '').trim(); // Strip inner tags for text
          const originalTag = match[0]; // Capture the original tag when match is guaranteed to be non-null
          
          elements.push({
            tagName: tagName,
            text: () => textContent,
            attr: (name: string, value?: string) => {
              // Simulate adding/getting an attribute - only 'id' for set is implemented for this task
              if (name === 'id' && value !== undefined) {
                // This is tricky without real DOM manipulation. We'll modify _html directly.
                // This is a simplified approach and might break with complex attributes.
                if (!originalTag.includes(` id=`)) { // Avoid adding multiple ids
                  const newTag = originalTag.replace(/<(h[23])/, `<$1 id="${value}"`);
                  _html = _html.replace(originalTag, newTag);
                }
              }
              return ''; // Getting attributes not implemented for this simulation
            },
            html: () => null // Not fully implemented
          });
        }
        return elements;
      },
      html: () => _html, // Return the modified HTML
    };
  }
};


async function getPostData(slug: string): Promise<FullBlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null; // Post not found
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Calculate reading time
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const minutesToRead = Math.round(wordCount / 200);
  const readingTime = `${minutesToRead} min read`;

  // Validate essential frontmatter fields
  // Using type assertion for 'data' to help TypeScript understand its shape
  // Using type assertion for 'data' to help TypeScript understand its shape
  // Explicitly include author in the type assertion for frontmatter
  const frontmatter = data as Partial<PostFrontmatter & { author?: string }>;

  if (!frontmatter.title || !frontmatter.date || !frontmatter.categories) {
    console.warn(`Missing essential frontmatter (title, date, or categories) in ${slug}.md for post page.`);
    return null;
  }

  const processedContent = await remark().use(html).process(content);
  let contentHtml = processedContent.toString();

  // Generate ToC and add IDs to headings
  const tocItems: { id: string; level: number; text: string }[] = [];
  const $ = cheerio.load(contentHtml); // Use simulated cheerio
  const headings = $.find('h2, h3'); // Simulated find

  headings.forEach(el => {
    const text = el.text();
    const level = parseInt(el.tagName.substring(1), 10);
    // Basic slugify: lowercase, replace spaces with hyphens, remove non-alphanumeric (except hyphens)
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    el.attr('id', id); // Add id to the heading in the HTML (simulated)
    tocItems.push({ id, level, text });
  });

  contentHtml = $.html(); // Get the modified HTML from simulated cheerio

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    image: frontmatter.image,
    categories: frontmatter.categories,
    excerpt: frontmatter.excerpt,
    author: frontmatter.author, // Added author
    contentHtml, // Potentially modified with IDs
    readingTime, // Added reading time
    tocItems, // Added ToC items
  };
}

// Define Props type for the page component, as expected by Next.js App Router
type PageContext = {
  params: Promise<{ slug: string }>;
  // searchParams?: { [key: string]: string | string[] | undefined }; // Include if you use searchParams
};

// Optional: Define generateMetadata if you need to set page metadata
// export async function generateMetadata({ params }: PageContext, parent: ResolvingMetadata): Promise<Metadata> {
//   const { slug } = await params;
//   const post = await getPostData(slug);
//
//   if (!post) {
//     return {
//       title: 'Příspěvek nenalezen',
//     };
//   }
//
//   return {
//     title: post.title,
//     // description: post.excerpt, // If you add excerpt to FullBlogPost
//     // openGraph: {
//     //   title: post.title,
//     //   images: post.image ? [{ url: post.image }] : [],
//     // },
//   };
// }

export default async function PostPage({ params }: PageContext) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound(); // Triggers 404 page
  }

  const siteBaseUrl = "https://www.example.com"; // Placeholder base URL

  const breadcrumbItems = [
    { href: "/", label: "Domů" },
    { href: "/blog", label: "Blog" },
    { href: `/blog/${post.slug}`, label: post.title },
  ];

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <article className="prose lg:prose-xl max-w-none mx-auto"> {/* Base prose styles */}
        <header className="mb-8 md:mb-10 border-b pb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 leading-tight">{post.title}</h1>
          <div className="mb-4"> {/* Wrapper div for consistent bottom margin for the metadata block */}
            <p className="text-sm text-muted-foreground"> {/* Changed to text-sm, removed mb-4 */}
              Publikováno: {new Date(post.date).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric' })} | {post.readingTime}
            </p>
            {post.author && (
              <p className="text-sm text-muted-foreground mt-1">Autor: {post.author}</p>
            )}
          </div>
          {post.image && (
            <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full"
                loading="lazy" // Added lazy loading
              />
            </div>
          )}
          <div className="mt-4 mb-6 flex flex-wrap gap-2">
            <span className="font-semibold self-center">Kategorie: </span> {/* Added self-center for alignment if tags wrap */}
            {post.categories.map((category) => (
              <span key={category} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full hover:bg-secondary/80 transition-colors">
                {category}
              </span>
            ))}
          </div>
        </header>

        {/* Table of Contents */}
        {post.tocItems && post.tocItems.length > 0 && (
          <nav className="mb-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-3">Obsah článku</h2>
            <ul className="space-y-2">
              {post.tocItems.map((item) => (
                <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                  <a href={`#${item.id}`} className="text-primary hover:underline">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Content styled by parent 'prose' class */}
        <div className="prose-p:text-justify prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary-focus" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        <footer className="mt-10 pt-8 border-t">
          <Link href="/blog" className="inline-flex items-center text-primary hover:underline text-lg font-medium"> {/* Added inline-flex for icon alignment */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Zpět na všechny příspěvky
          </Link>

          <div className="mt-6 pt-4 border-t">
            <h3 className="text-lg font-semibold mb-2">Sdílet tento příspěvek:</h3>
            <div className="flex space-x-4">
              <a
                href={`https://twitter.com/intent/tweet?url=${siteBaseUrl}/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                X (Twitter)
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${siteBaseUrl}/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
