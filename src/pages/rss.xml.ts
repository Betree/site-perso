import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { getPostSlug, sortPostsByDate } from '../utils/blog';

export const GET: APIRoute = async (context) => {
  const posts = sortPostsByDate(
    await getCollection('blog', ({ data }) => !data.draft),
  );

  return rss({
    title: `${site.title} · Blog`,
    description: 'Articles by Benjamin Piouffle',
    site: context.site,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${getPostSlug(post)}/`,
    })),
    customData: [
      '<language>en-us</language>',
      `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml"/>`,
    ].join(''),
  });
};
