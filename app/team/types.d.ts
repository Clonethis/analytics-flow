import type { BlogPost } from '@/lib/types';

declare module 'next' {
  interface PageProps {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}

export interface FullBlogPost extends Omit<BlogPost, 'content' | 'excerpt'> {
  contentHtml: string;
}