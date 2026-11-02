export const socialIconByLabel: Record<string, string> = {
  Email: 'lucide:mail',
  GitHub: 'simple-icons:github',
  LinkedIn: 'simple-icons:linkedin',
  Mastodon: 'simple-icons:mastodon',
};

export function socialIconName(label: string): string | undefined {
  return socialIconByLabel[label];
}
