import * as cheerio from 'cheerio';

export function toAbsoluteUrl(baseUrl: string, path: string): string {
  return new URL(path, baseUrl).href;
}

export function absolutizeAssetUrls(html: string, baseUrl: string): string {
  const $ = cheerio.load(`<div id="rss-root">${html}</div>`);
  const root = $('#rss-root');

  root.find('[href]').each((_, element) => {
    const href = $(element).attr('href');
    if (href?.startsWith('/')) {
      $(element).attr('href', toAbsoluteUrl(baseUrl, href));
    }
  });

  root.find('[src]').each((_, element) => {
    const src = $(element).attr('src');
    if (src?.startsWith('/')) {
      $(element).attr('src', toAbsoluteUrl(baseUrl, src));
    }
  });

  return root.html() ?? '';
}
