import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  
  return rss({
    title: 'Blog',
    description: 'Web開発とプログラミングに関するブログ',
    site: context.site,
    items: posts
      .filter(post => !post.data.draft)
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}/`,
      })),
    customData: `<language>ja-jp</language>`,
  });
}