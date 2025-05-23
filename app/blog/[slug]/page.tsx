import fs from 'fs';
import path from 'path';
import Link from 'next/link';
// import Image from 'next/image'; // Optional, using img for placeholder consistency
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost } from '@/lib/types'; // Adjust path if needed
import { notFound } from 'next/navigation'; // For handling non-existent posts

const postsDirectory = path.join(process.cwd(), 'data/blog');

export async function generateStaticParams() {
  let filenames: string[];
  try {
    filenames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.md'));
  } catch (error) {
    console.error("Could not read blog posts directory for generateStaticParams:", error);
    return []; // Return empty array if directory doesn't exist or is unreadable
  }
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

// Type for the enriched post data including contentHtml
interface FullBlogPost extends Omit<BlogPost, 'content' | 'excerpt'> {
  contentHtml: string;
}

async function getPostData(slug: string): Promise<FullBlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null; // Post not found
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Basic validation for essential frontmatter fields
  if (!data.title || !data.date || !data.categories) {
    console.warn(`Missing essential frontmatter in ${slug}.md for post page.`);
    return null; // Or handle as appropriate, perhaps by redirecting or showing an error
  }

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    date: data.date,
    image: data.image || null, // Handle missing image gracefully
    categories: data.categories,
    contentHtml,
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound(); // Triggers 404 page
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <article className="prose lg:prose-xl max-w-none mx-auto"> {/* Base prose styles */}
        <header className="mb-8 md:mb-10 border-b pb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 leading-tight">{post.title}</h1>
          <p className="text-base text-muted-foreground mb-4">
            Publikováno: {new Date(post.date).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
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
            {post.categories.map((category) => ( // Removed index from map as it's not used for comma
              <span key={category} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full hover:bg-secondary/80 transition-colors">
                {category}
              </span>
            ))}
          </div>
        </header>
        {/* Content styled by parent 'prose' class */}
        <div className="prose-p:text-justify prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary-focus" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        <footer className="mt-10 pt-8 border-t">
          <Link href="/blog" className="inline-flex items-center text-primary hover:underline text-lg font-medium"> {/* Added inline-flex for icon alignment */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Zpět na všechny příspěvky
          </Link>
        </footer>
      </article>
    </main>
  );
}
