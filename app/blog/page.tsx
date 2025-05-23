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
  const buildQueryString = (newParams: { category?: string | null; sort?: string; order?: string }): string => {
    const currentParams = new URLSearchParams();

    // Handle Category
    // If 'category' is explicitly provided in newParams:
    // - If it's a non-empty string, set it.
    // - If it's undefined, null, or empty string, it means we want to remove/omit the category param.
    // If 'category' is NOT in newParams, preserve the existing categoryFilter (if any).
    if (newParams.hasOwnProperty('category')) {
      if (newParams.category) { // Check if truthy (non-empty string)
        currentParams.set('category', newParams.category);
      }
      // If newParams.category is undefined, null, or '', the category param is effectively removed.
    } else if (categoryFilter) {
      currentParams.set('category', categoryFilter);
    }

    // Handle Sort
    if (newParams.hasOwnProperty('sort')) {
        if (newParams.sort) currentParams.set('sort', newParams.sort);
    } else if (sortBy) {
      currentParams.set('sort', sortBy);
    }

    // Handle Order
    if (newParams.hasOwnProperty('order')) {
        if (newParams.order) currentParams.set('order', newParams.order);
    } else if (sortOrder) {
      currentParams.set('order', sortOrder);
    }
    
    return currentParams.toString();
  };


  if (posts.length === 0 && categoryFilter) { // Special message if filtering yields no results
    return (
      <main className="container mx-auto px-4 py-8 md:py-12"> {/* Adjusted py */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Náš Blog</h1> {/* Adjusted text size */}
        {/* Sorting controls remain visible */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-6"> {/* Adjusted margin, items-center, justify-center */}
          <span className="font-semibold text-muted-foreground mr-2">Řadit podle:</span>
          <Link href={`/blog?${buildQueryString({ sort: 'date', order: 'desc' })}`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${sortBy === 'date' && sortOrder === 'desc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Datum (nejnovější)
          </Link>
          <Link href={`/blog?${buildQueryString({ sort: 'date', order: 'asc' })}`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${sortBy === 'date' && sortOrder === 'asc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Datum (nejstarší)
          </Link>
          <Link href={`/blog?${buildQueryString({ sort: 'title', order: 'asc' })}`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${sortBy === 'title' && sortOrder === 'asc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Název (A-Z)
          </Link>
          <Link href={`/blog?${buildQueryString({ sort: 'title', order: 'desc' })}`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${sortBy === 'title' && sortOrder === 'desc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Název (Z-A)
          </Link>
        </div>
         {/* Category filter controls remain visible */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-10"> {/* Adjusted gap */}
          <span className="font-semibold text-muted-foreground mr-2">Filtrovat podle kategorie:</span>
          <Link href={`/blog?${buildQueryString({ category: undefined }) }`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${!categoryFilter ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/80'}`}>
            Všechny
          </Link>
          {allCategories.map(category => (
            <Link key={category} href={`/blog?${buildQueryString({ category: category }) }`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${categoryFilter === category ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/80'}`}>
              {category}
            </Link>
          ))}
        </div>
        <p className="text-center text-muted-foreground">Pro kategorii "{categoryFilter}" nebyly nalezeny žádné příspěvky.</p>
      </main>
    );
  } else if (posts.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8 md:py-12"> {/* Adjusted py */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Náš Blog</h1> {/* Adjusted text size */}
        <p className="text-center text-muted-foreground">Zatím zde nejsou žádné příspěvky. Zkuste to prosím později!</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12"> {/* Adjusted py */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Náš Blog</h1> {/* Adjusted text size */}
      
      {/* Combined Sorting and Filtering Controls Area */}
      <div className="mb-10 space-y-6"> {/* Grouped controls with more bottom margin */}
        {/* Sorting Controls */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"> {/* Centered controls */}
          <span className="font-semibold text-muted-foreground mr-2">Řadit podle:</span>
          <Link href={`/blog?${buildQueryString({ sort: 'date', order: 'desc' })}`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${sortBy === 'date' && sortOrder === 'desc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Datum (nejnovější)
          </Link>
          <Link href={`/blog?${buildQueryString({ sort: 'date', order: 'asc' })}`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${sortBy === 'date' && sortOrder === 'asc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Datum (nejstarší)
          </Link>
          <Link href={`/blog?${buildQueryString({ sort: 'title', order: 'asc' })}`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${sortBy === 'title' && sortOrder === 'asc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Název (A-Z)
          </Link>
          <Link href={`/blog?${buildQueryString({ sort: 'title', order: 'desc' })}`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${sortBy === 'title' && sortOrder === 'desc' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
            Název (Z-A)
          </Link>
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"> {/* Centered controls, adjusted gap */}
          <span className="font-semibold text-muted-foreground mr-2">Filtrovat podle kategorie:</span>
          <Link href={`/blog?${buildQueryString({ category: undefined }) }`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${!categoryFilter ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/80'}`}>
            Všechny
          </Link>
          {allCategories.map(category => (
            <Link key={category} href={`/blog?${buildQueryString({ category: category }) }`} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${categoryFilter === category ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/80'}`}>
              {category}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Adjusted grid gap and sm breakpoint */}
        {posts.map((post) => (
          <article key={post.slug} className="bg-card text-card-foreground border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col h-full"> {/* Added text-card-foreground, shadow-md, ease-in-out, h-full */}
            {post.image && (
              <Link href={`/blog/${post.slug}`} passHref>
                <div className="relative w-full h-52"> {/* Adjusted image height */}
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full" 
                    loading="lazy" // Added lazy loading
                  />
                </div>
              </Link>
            )}
            <div className="p-5 flex flex-col flex-grow"> {/* Adjusted padding */}
              <h2 className="text-xl lg:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors"> {/* Adjusted text size, removed min-h */}
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground mb-2"> {/* Adjusted margin */}
                {new Date(post.date).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div className="flex flex-wrap gap-2 mb-3"> {/* Adjusted container for categories */}
                {post.categories.map((category) => (
                  <span key={category} className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-accent/80 transition-colors"> {/* Adjusted category tag style */}
                    {category}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">{post.excerpt}</p> {/* Added text-sm */}
              <Link href={`/blog/${post.slug}`} className="mt-auto self-start text-sm font-medium text-primary hover:underline"> {/* Adjusted "Read More" link style */}
                Číst více <span aria-hidden="true" className="ml-1">&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
