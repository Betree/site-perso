// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import icon from 'astro-icon';
import rehypeExternalLinks from 'rehype-external-links';
import { legacyBlogRedirects } from './src/data/blogRedirects.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://benjamin.piouffle.com',
  redirects: legacyBlogRedirects(),
  markdown: {
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: '_blank',
            rel: ['noopener', 'noreferrer'],
            properties: { class: 'external-link' },
          },
        ],
      ],
    }),
  },
  integrations: [
    icon({
      include: {
        lucide: ['mail', 'mountain', 'guitar', 'orbit'],
        'circle-flags': ['fr', 'gb', 'it'],
        'simple-icons': [
          'arduino',
          'docker',
          'elixir',
          'git',
          'github',
          'graphql',
          'linkedin',
          'linux',
          'mastodon',
          'phoenixframework',
          'postgresql',
          'python',
          'react',
          'typescript',
        ],
      },
    }),
  ],
});
