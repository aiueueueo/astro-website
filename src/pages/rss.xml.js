import rss from '@astrojs/rss';
import { getPublishedPosts } from '../services/blogService';

export async function GET(context) {
  const posts = await getPublishedPosts();
  
  return rss({
    title: 'Blog',
    description: 'Web開発とプログラミングに関するブログ',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>ja-jp</language>`,
  });
}
