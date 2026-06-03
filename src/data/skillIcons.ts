/** Icon names for `<Icon name="…" />` (lucide, circle-flags, etc.). */
export const skillIconByLabel: Record<string, string> = {
  'Rock Climbing': 'lucide:mountain',
  'Flamenco Guitar': 'lucide:guitar',
  Holacracy: 'lucide:orbit',
  'French (native)': 'circle-flags:fr',
  'English (fluent)': 'circle-flags:gb',
  'Italian (basic)': 'circle-flags:it',
};

export function skillIconName(label: string): string | undefined {
  return skillIconByLabel[label];
}
