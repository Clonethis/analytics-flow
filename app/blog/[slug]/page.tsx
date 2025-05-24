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
  // Add any other frontmatter fields you expect from BlogPost
}

// Type for the enriched post data including contentHtml
interface FullBlogPost extends PostFrontmatter {
  slug: string;
  contentHtml: string;
}

async function getPostData(slug: string): Promise<FullBlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null; // Post not found
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Validate essential frontmatter fields
  // Using type assertion for 'data' to help TypeScript understand its shape
  const frontmatter = data as Partial<PostFrontmatter>;

  if (!frontmatter.title || !frontmatter.date || !frontmatter.categories) {
    console.warn(`Missing essential frontmatter (title, date, or categories) in ${slug}.md for post page.`);
    return null;
  }

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    image: frontmatter.image,
    categories: frontmatter.categories,
    excerpt: frontmatter.excerpt,
    contentHtml,
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
            {post.categories.map((category) => (
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
