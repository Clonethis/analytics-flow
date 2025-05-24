export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO format, e.g., "2023-10-26"
  image?: string; // URL or path to an image
  categories: string[];
  excerpt: string;
  content: string; // Full content, likely Markdown
}
