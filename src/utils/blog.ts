import type { CollectionEntry } from 'astro:content';

export function getPostSlug(entry: CollectionEntry<'blog'>): string {
  const id = entry.id;
  if (id.endsWith('/index')) {
    return id.slice(0, -'/index'.length);
  }
  return id.replace(/\.md$/, '');
}

export function sortPostsByDate(
  posts: CollectionEntry<'blog'>[],
): CollectionEntry<'blog'>[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function formatCategory(category: string): string {
  const label = category.replace(/-/g, ' ');
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
