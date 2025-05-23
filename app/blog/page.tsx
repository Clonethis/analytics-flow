import fs from 'fs';
import path from 'path';
import Link from 'next/link';
// import Image from 'next/image'; // Using img for simplicity as per instructions for placeholder
import matter from 'gray-matter';
import { BlogPost } from '@/lib/types'; // Adjust path if needed, assuming @/lib maps to lib/

// Helper function to get posts (can be in this file or a separate lib/blog.ts)
async function getAllBlogPosts(sortBy: string = 'date', sortOrder: string = 'desc', categoryFilter?: string): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'data/blog');
  let filenames: string[];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error("Could not read blog posts directory:", error);
    return []; // Return empty array if directory doesn't exist or is unreadable
  }

  const posts = filenames
    .filter(filename => filename.endsWith('.md')) // Ensure only markdown files are processed
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents); // data is frontmatter

      // Basic validation for essential frontmatter fields
      if (!data.title || !data.date || !data.excerpt || !data.categories) {
        console.warn(`Missing essential frontmatter in ${filename}. Skipping.`);
        return null; 
      }

      return {
        slug,
        title: data.title,
        date: data.date,
        image: data.image || null, // Handle missing image gracefully
        categories: data.categories,
        excerpt: data.excerpt,
        content, // Full markdown content
      } as BlogPost;
    })
    .filter(post => post !== null) as BlogPost[]; // Filter out nulls (skipped posts)

  // Filter posts by category if a categoryFilter is provided
  let filteredPosts = posts;
  if (categoryFilter) {
    filteredPosts = posts.filter(post => post.categories.includes(categoryFilter));
  }

  // Sort posts
  filteredPosts.sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'date') {
      // For date, descending means newer dates first.
      // getTime() returns milliseconds since epoch; higher value is newer.
      comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortOrder === 'asc') {
        comparison = -comparison; // Reverse for ascending (older first)
      }
    } else if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title); // Default asc for title
      if (sortOrder === 'desc') {
        comparison = -comparison; // Reverse for descending (Z-A)
      }
    }
    return comparison;
  });

  return filteredPosts;
}

export default async function BlogPage({ searchParams }: { searchParams?: { sort?: string; order?: string; category?: string } }) {
  const sortBy = searchParams?.sort || 'date';
  const sortOrder = searchParams?.order || 'desc';
  const categoryFilter = searchParams?.category;

  // To get all categories for the filter UI, we fetch all posts without category filter first.
  const allPostsForCategoryList = await getAllBlogPosts('date', 'desc'); // Default sort for category list
  const allCategories = Array.from(new Set(allPostsForCategoryList.flatMap(post => post.categories))).sort();

  const posts = await getAllBlogPosts(sortBy, sortOrder, categoryFilter);

  // Function to build query string for links, preserving existing sort/order if any
  const buildQueryString = (newParams: { category?: string; sort?: string; order?: string }): string => {
    const currentParams = new URLSearchParams();
    if (newParams.category !== undefined) currentParams.set('category', newParams.category);
    else if (categoryFilter) currentParams.set('category', categoryFilter); // Preserve current category if not explicitly changing

    if (newParams.sort !== undefined) currentParams.set('sort', newParams.sort);
    else if (sortBy) currentParams.set('sort', sortBy); // Preserve current sort

    if (newParams.order !== undefined) currentParams.set('order', newParams.order);
    else if (sortOrder) currentParams.set('order', sortOrder); // Preserve current order
    
    return currentParams.toString();
  };


  if (posts.length === 0 && categoryFilter) { // Special message if filtering yields no results
    return (
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Náš Blog</h1>
        {/* Sorting controls remain visible */}
        <div className="mb-8 flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2">
          <span className="font-semibold text-muted-foreground self-center">Řadit podle:</span>
          <Link href={`/blog?${buildQueryString({ sort: 'date', order: 'desc' })}`} className={`text-sm px-3 py-1 rounded-md transition-colors ${sortBy === 'date' && sortOrder === 'desc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Datum (nejnovější)
          </Link>
          <Link href={`/blog?${buildQueryString({ sort: 'date', order: 'asc' })}`} className={`text-sm px-3 py-1 rounded-md transition-colors ${sortBy === 'date' && sortOrder === 'asc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Datum (nejstarší)
          </Link>
          <Link href={`/blog?${buildQueryString({ sort: 'title', order: 'asc' })}`} className={`text-sm px-3 py-1 rounded-md transition-colors ${sortBy === 'title' && sortOrder === 'asc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Název (A-Z)
          </Link>
          <Link href={`/blog?${buildQueryString({ sort: 'title', order: 'desc' })}`} className={`text-sm px-3 py-1 rounded-md transition-colors ${sortBy === 'title' && sortOrder === 'desc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Název (Z-A)
          </Link>
        </div>
         {/* Category filter controls remain visible */}
        <div className="mb-10 flex flex-wrap justify-center gap-x-3 gap-y-2 items-center">
          <span className="font-semibold text-muted-foreground">Filtrovat podle kategorie:</span>
          <Link href={`/blog?${buildQueryString({ category: undefined }) }`} className={`text-sm px-3 py-1 rounded-md transition-colors ${!categoryFilter ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/80'}`}>
            Všechny
          </Link>
          {allCategories.map(category => (
            <Link key={category} href={`/blog?${buildQueryString({ category: category }) }`} className={`text-sm px-3 py-1 rounded-md transition-colors ${categoryFilter === category ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/80'}`}>
              {category}
            </Link>
          ))}
        </div>
        <p className="text-center text-muted-foreground">Pro kategorii "{categoryFilter}" nebyly nalezeny žádné příspěvky.</p>
      </main>
    );
  } else if (posts.length === 0) {
    return (
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Náš Blog</h1>
        <p className="text-center text-muted-foreground">Zatím zde nejsou žádné příspěvky. Zkuste to prosím později!</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Náš Blog</h1>
      
      {/* Sorting Controls */}
      <div className="mb-4 flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2">
        <span className="font-semibold text-muted-foreground self-center">Řadit podle:</span>
        <Link href={`/blog?${buildQueryString({ sort: 'date', order: 'desc' })}`} className={`text-sm px-3 py-1 rounded-md transition-colors ${sortBy === 'date' && sortOrder === 'desc' && !categoryFilter ? 'bg-primary text-primary-foreground hover:bg-primary/90' : (sortBy === 'date' && sortOrder === 'desc' ? 'bg-primary/80 text-primary-foreground hover:bg-primary/70' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80')}`}>
          Datum (nejnovější)
        </Link>
        <Link href={`/blog?${buildQueryString({ sort: 'date', order: 'asc' })}`} className={`text-sm px-3 py-1 rounded-md transition-colors ${sortBy === 'date' && sortOrder === 'asc' && !categoryFilter ? 'bg-primary text-primary-foreground hover:bg-primary/90' : (sortBy === 'date' && sortOrder === 'asc' ? 'bg-primary/80 text-primary-foreground hover:bg-primary/70' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80')}`}>
          Datum (nejstarší)
        </Link>
        <Link href={`/blog?${buildQueryString({ sort: 'title', order: 'asc' })}`} className={`text-sm px-3 py-1 rounded-md transition-colors ${sortBy === 'title' && sortOrder === 'asc' && !categoryFilter ? 'bg-primary text-primary-foreground hover:bg-primary/90' : (sortBy === 'title' && sortOrder === 'asc' ? 'bg-primary/80 text-primary-foreground hover:bg-primary/70' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80')}`}>
          Název (A-Z)
        </Link>
        <Link href={`/blog?${buildQueryString({ sort: 'title', order: 'desc' })}`} className={`text-sm px-3 py-1 rounded-md transition-colors ${sortBy === 'title' && sortOrder === 'desc' && !categoryFilter ? 'bg-primary text-primary-foreground hover:bg-primary/90' : (sortBy === 'title' && sortOrder === 'desc' ? 'bg-primary/80 text-primary-foreground hover:bg-primary/70' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80')}`}>
          Název (Z-A)
        </Link>
      </div>

      {/* Category Filter Controls */}
      <div className="mb-10 flex flex-wrap justify-center gap-x-3 gap-y-2 items-center">
        <span className="font-semibold text-muted-foreground">Filtrovat podle kategorie:</span>
        <Link href={`/blog?${buildQueryString({ category: undefined }) }`} className={`text-sm px-3 py-1 rounded-md transition-colors ${!categoryFilter ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/80'}`}>
          Všechny
        </Link>
        {allCategories.map(category => (
          <Link key={category} href={`/blog?${buildQueryString({ category: category }) }`} className={`text-sm px-3 py-1 rounded-md transition-colors ${categoryFilter === category ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/80'}`}>
            {category}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col bg-card border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {post.image && (
              <Link href={`/blog/${post.slug}`} passHref>
                <div className="relative w-full h-56"> {/* Fixed height for images */}
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full" 
                    // Consider adding loading="lazy" for performance
                  />
                </div>
              </Link>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold mb-3 min-h-[3em] group-hover:text-primary transition-colors"> {/* min-h for title consistency */}
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                {new Date(post.date).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div className="mb-4">
                {post.categories.map((category) => (
                  <span key={category} className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold mr-2 mb-2 px-3 py-1 rounded-full">
                    {category}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mb-5 flex-grow">{post.excerpt}</p> {/* flex-grow for excerpt */}
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-primary hover:underline font-semibold mt-auto self-start">
                Číst více <span aria-hidden="true" className="ml-1">&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
