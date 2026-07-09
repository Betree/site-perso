import { beforeEach, describe, expect, it, vi } from 'vitest';
import { absolutizeAssetUrls, toAbsoluteUrl } from '../utils/rss';

const baseUrl = 'https://benjamin.piouffle.com/';

describe('toAbsoluteUrl', () => {
  it('resolves root-relative paths against the site URL', () => {
    expect(toAbsoluteUrl(baseUrl, '/rss.xml')).toBe(
      'https://benjamin.piouffle.com/rss.xml',
    );
  });

  it('resolves asset paths', () => {
    expect(toAbsoluteUrl(baseUrl, '/_astro/banner.webp')).toBe(
      'https://benjamin.piouffle.com/_astro/banner.webp',
    );
  });
});

describe('absolutizeAssetUrls', () => {
  it('converts relative href attributes to absolute URLs', () => {
    const html = '<p><a href="/blog/example/">Read more</a></p>';

    expect(absolutizeAssetUrls(html, baseUrl)).toContain(
      'href="https://benjamin.piouffle.com/blog/example/"',
    );
  });

  it('converts relative src attributes to absolute URLs', () => {
    const html = '<p><img src="/_astro/banner.webp" alt="Banner"></p>';

    expect(absolutizeAssetUrls(html, baseUrl)).toContain(
      'src="https://benjamin.piouffle.com/_astro/banner.webp"',
    );
  });

  it('leaves already-absolute URLs unchanged', () => {
    const html =
      '<p><a href="https://example.com">External</a><img src="https://cdn.example.com/img.png"></p>';

    const result = absolutizeAssetUrls(html, baseUrl);

    expect(result).toContain('href="https://example.com"');
    expect(result).toContain('src="https://cdn.example.com/img.png"');
  });

  it('updates multiple elements in one fragment', () => {
    const html =
      '<p><a href="/one">One</a></p><p><img src="/two.png"><a href="/three">Three</a></p>';

    const result = absolutizeAssetUrls(html, baseUrl);

    expect(result).toContain('href="https://benjamin.piouffle.com/one"');
    expect(result).toContain('src="https://benjamin.piouffle.com/two.png"');
    expect(result).toContain('href="https://benjamin.piouffle.com/three"');
  });

  it('returns an empty string for empty input', () => {
    expect(absolutizeAssetUrls('', baseUrl)).toBe('');
  });
});

const mockGetCollection = vi.fn();
const mockRender = vi.fn();
const mockGetImage = vi.fn();
const mockRenderToString = vi.fn();
const mockRss = vi.fn();

vi.mock('astro:content', () => ({
  getCollection: (...args: unknown[]) => mockGetCollection(...args),
  render: (...args: unknown[]) => mockRender(...args),
}));

vi.mock('astro:assets', () => ({
  getImage: (...args: unknown[]) => mockGetImage(...args),
}));

vi.mock('astro/container', () => ({
  experimental_AstroContainer: {
    create: vi.fn(async () => ({
      renderToString: (...args: unknown[]) => mockRenderToString(...args),
    })),
  },
}));

vi.mock('@astrojs/rss', () => ({
  default: (...args: unknown[]) => mockRss(...args),
}));

vi.mock('../assets/benjaminpiouffle.jpg', () => ({
  default: {
    src: '/src/assets/benjaminpiouffle.jpg',
    width: 400,
    height: 400,
  },
}));

const { GET } = await import('../pages/rss.xml');

function createPost(overrides: {
  id: string;
  title: string;
  description: string;
  pubDate: Date;
  draft?: boolean;
}) {
  return {
    id: overrides.id,
    collection: 'blog' as const,
    data: {
      title: overrides.title,
      description: overrides.description,
      pubDate: overrides.pubDate,
      category: 'privacy',
      draft: overrides.draft ?? false,
    },
    body: '',
  };
}

describe('GET /rss.xml', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockGetImage.mockResolvedValue({ src: '/_astro/benjaminpiouffle.jpg' });
    mockRss.mockReturnValue(new Response('<rss></rss>', { status: 200 }));
    mockRenderToString.mockResolvedValue(
      '<p><a href="/blog/example/">Read more</a><img src="/_astro/banner.webp" alt="Banner"></p>',
    );
  });

  it('builds an RSS feed from published blog posts', async () => {
    const posts = [
      createPost({
        id: 'newer-post/index',
        title: 'Newer post',
        description: 'Newer description',
        pubDate: new Date('2026-07-08'),
      }),
      createPost({
        id: 'older-post/index',
        title: 'Older post',
        description: 'Older description',
        pubDate: new Date('2018-08-21'),
      }),
    ];

    mockGetCollection.mockResolvedValue(posts);
    mockRender.mockImplementation(async (post: (typeof posts)[number]) => ({
      Content: `Content-${post.id}`,
    }));

    const response = await GET({
      site: new URL('https://benjamin.piouffle.com'),
    } as Parameters<typeof GET>[0]);

    expect(mockGetCollection).toHaveBeenCalledWith('blog', expect.any(Function));
    expect(mockGetCollection.mock.calls[0][1]({ data: { draft: true } })).toBe(
      false,
    );
    expect(mockGetCollection.mock.calls[0][1]({ data: { draft: false } })).toBe(
      true,
    );

    expect(mockGetImage).toHaveBeenCalledWith({
      src: expect.objectContaining({ src: '/src/assets/benjaminpiouffle.jpg' }),
      width: 144,
      height: 144,
      format: 'jpg',
    });

    expect(mockRender).toHaveBeenCalledTimes(2);
    expect(mockRenderToString).toHaveBeenCalledTimes(2);

    expect(mockRss).toHaveBeenCalledWith({
      title: 'Benjamin Piouffle · Blog',
      description: 'Articles by Benjamin Piouffle',
      site: 'https://benjamin.piouffle.com/',
      xmlns: { atom: 'http://www.w3.org/2005/Atom' },
      items: [
        expect.objectContaining({
          title: 'Newer post',
          description: 'Newer description',
          link: '/blog/newer-post/',
          content: expect.stringContaining(
            'href="https://benjamin.piouffle.com/blog/example/"',
          ),
        }),
        expect.objectContaining({
          title: 'Older post',
          description: 'Older description',
          link: '/blog/older-post/',
          content: expect.stringContaining(
            'src="https://benjamin.piouffle.com/_astro/banner.webp"',
          ),
        }),
      ],
      customData: expect.stringContaining(
        '<url>https://benjamin.piouffle.com/_astro/benjaminpiouffle.jpg</url>',
      ),
    });

    expect(mockRss.mock.calls[0][0].customData).toContain(
      '<atom:icon>https://benjamin.piouffle.com/_astro/benjaminpiouffle.jpg</atom:icon>',
    );
    expect(mockRss.mock.calls[0][0].customData).toContain(
      '<atom:link href="https://benjamin.piouffle.com/rss.xml" rel="self" type="application/rss+xml"/>',
    );

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(200);
  });

  it('sorts posts by publication date descending', async () => {
    const posts = [
      createPost({
        id: 'older-post/index',
        title: 'Older post',
        description: 'Older description',
        pubDate: new Date('2018-08-21'),
      }),
      createPost({
        id: 'newer-post/index',
        title: 'Newer post',
        description: 'Newer description',
        pubDate: new Date('2026-07-08'),
      }),
    ];

    mockGetCollection.mockResolvedValue(posts);
    mockRender.mockImplementation(async (post: (typeof posts)[number]) => ({
      Content: `Content-${post.id}`,
    }));

    await GET({
      site: new URL('https://benjamin.piouffle.com'),
    } as Parameters<typeof GET>[0]);

    const items = mockRss.mock.calls[0][0].items;
    expect(items.map((item: { title: string }) => item.title)).toEqual([
      'Newer post',
      'Older post',
    ]);
  });
});
