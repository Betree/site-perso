import rss from '@astrojs/rss';
import { getImage } from 'astro:assets';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getCollection, render } from 'astro:content';
import type { APIRoute } from 'astro';
import avatarImage from '../assets/benjaminpiouffle.jpg';
import { site } from '../data/site';
import { getPostSlug, sortPostsByDate } from '../utils/blog';
import { absolutizeAssetUrls, toAbsoluteUrl } from '../utils/rss';

export const GET: APIRoute = async (context) => {
  const baseUrl = context.site!.href;
  const feedImage = await getImage({
    src: avatarImage,
    width: 144,
    height: 144,
    format: 'jpg',
  });
  const feedImageUrl = toAbsoluteUrl(baseUrl, feedImage.src);

  const container = await AstroContainer.create();
  const posts = sortPostsByDate(
    await getCollection('blog', ({ data }) => !data.draft),
  );

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const rawContent = await container.renderToString(Content);
      const content = absolutizeAssetUrls(rawContent, baseUrl);

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${getPostSlug(post)}/`,
        content,
      };
    }),
  );

  return rss({
    title: `${site.title} · Blog`,
    description: 'Articles by Benjamin Piouffle',
    site: baseUrl,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items,
    customData: [
      '<language>en-us</language>',
      `<atom:link href="${toAbsoluteUrl(baseUrl, '/rss.xml')}" rel="self" type="application/rss+xml"/>`,
      `<image>
        <url>${feedImageUrl}</url>
        <title>${site.title}</title>
        <link>${baseUrl}</link>
        <width>144</width>
        <height>144</height>
      </image>`,
      `<atom:icon>${feedImageUrl}</atom:icon>`,
    ].join(''),
  });
};
