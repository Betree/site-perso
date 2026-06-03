export const aboutSections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

export type AboutSectionId = (typeof aboutSections)[number]['id'];

export const SECTION_IDS = aboutSections.map((section) => section.id);
