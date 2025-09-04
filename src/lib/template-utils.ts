// Utility helpers for template mapping and related helpers.

import type { Template } from './types';

// Map a gallery template (name/tags) to the app Template union.
export function mapToAppTemplateFromName(name: string, tags: string[] = []): Template {
  const n = name.toLowerCase();
  const t = tags.map(tag => tag.toLowerCase());
  if (n.includes('modern') || t.includes('modern') || t.includes('tech')) return 'modern';
  if (n.includes('classic') || n.includes('executive')) return 'classic';
  if (n.includes('ats') || t.includes('ats-optimized') || t.includes('ats')) return 'ats';
  return 'modern';
}

export default mapToAppTemplateFromName;
