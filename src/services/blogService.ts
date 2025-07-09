import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_IMAGES } from '../config/constants';

let cachedAllPosts: CollectionEntry<'blog'>[] | null = null;
let cachedPublishedPosts: CollectionEntry<'blog'>[] | null = null;

export async function getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
  if (!cachedAllPosts) {
    cachedAllPosts = await getCollection('blog');
  }
  return cachedAllPosts!;
}

export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  if (!cachedPublishedPosts) {
    const allPosts = await getAllPosts();
    cachedPublishedPosts = allPosts
      .filter(post => !post.data.draft)
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  }
  return cachedPublishedPosts!;
}

export async function getPostsByTag(tag: string): Promise<CollectionEntry<'blog'>[]> {
  const publishedPosts = await getPublishedPosts();
  return publishedPosts.filter(post => post.data.tags.includes(tag));
}

export async function getRecentPosts(limit: number = 3): Promise<CollectionEntry<'blog'>[]> {
  const publishedPosts = await getPublishedPosts();
  return publishedPosts.slice(0, limit);
}

export function transformToArticleData(post: CollectionEntry<'blog'>) {
  return {
    title: post.data.title,
    description: post.data.description,
    image: post.data.heroImage || DEFAULT_IMAGES.ARTICLE,
    tags: post.data.tags,
    date: post.data.pubDate.toISOString().split('T')[0],
    slug: post.slug,
    content: post.body
  };
}

export function transformToSearchArticle(post: CollectionEntry<'blog'>) {
  return {
    title: post.data.title,
    description: post.data.description,
    image: post.data.heroImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    tags: post.data.tags,
    date: post.data.pubDate.toISOString().split('T')[0],
    slug: post.slug,
    content: post.body
  };
}

export async function getAllTags(): Promise<Array<{ tag: string; count: number }>> {
  const publishedPosts = await getPublishedPosts();
  const tagCounts = new Map<string, number>();
  
  publishedPosts.forEach(post => {
    post.data.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}

export async function getRelatedTagsForTag(targetTag: string): Promise<string[]> {
  const taggedPosts = await getPostsByTag(targetTag);
  const relatedTags = new Map<string, number>();
  
  taggedPosts.forEach(post => {
    post.data.tags.forEach(tag => {
      if (tag !== targetTag) {
        relatedTags.set(tag, (relatedTags.get(tag) || 0) + 1);
      }
    });
  });

  return Array.from(relatedTags.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);
}
