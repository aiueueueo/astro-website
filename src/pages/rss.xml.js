import rss from '@astrojs/rss';
import { getBlogs } from '../lib/microcms';

export async function GET(context) {
  const response = await getBlogs({ limit: 100 });

  return rss({
    title: 'Blog',
    description: 'Web開発とプログラミングに関するブログ',
    site: context.site,
    items: response.contents.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: new Date(post.publishedDate),
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>ja-jp</language>`,
  });
}
