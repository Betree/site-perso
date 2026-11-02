/** Legacy Gatsby blog used root-level slugs; map each to /blog/[slug]. */
export const legacyBlogSlugs = [
  'the-urge-for-a-collaborative-citizen-fact-checking-platform',
  'display-channel-users-count-elixir-phoenix-react-redux',
] as const;

export function legacyBlogRedirects(): Record<string, string> {
  return Object.fromEntries(
    legacyBlogSlugs.map((slug) => [`/${slug}`, `/blog/${slug}`]),
  );
}
