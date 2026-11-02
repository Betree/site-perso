/** Simple Icons slugs used with `<Icon name="simple-icons:…" />`. */
export const techIconByLabel: Record<string, string> = {
  Apollo: 'apollographql',
  Arduino: 'arduino',
  C: 'c',
  'C#': 'csharp',
  'C++': 'cplusplus',
  Docker: 'docker',
  Elixir: 'elixir',
  Git: 'git',
  GraphQL: 'graphql',
  'GNU/Linux': 'linux',
  HTML: 'html5',
  JavaScript: 'javascript',
  JQuery: 'jquery',
  MySQL: 'mysql',
  NodeJS: 'nodedotjs',
  PHP: 'php',
  Phoenix: 'phoenixframework',
  'Phoenix Framework': 'phoenixframework',
  PostgreSQL: 'postgresql',
  Python: 'python',
  React: 'react',
  Redux: 'redux',
  TypeScript: 'typescript',
};

export function techIconName(label: string): string | undefined {
  const slug = techIconByLabel[label];
  return slug ? `simple-icons:${slug}` : undefined;
}
