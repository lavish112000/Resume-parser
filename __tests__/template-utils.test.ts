import mapToAppTemplateFromName from '@/lib/template-utils';

describe('mapToAppTemplateFromName', () => {
  test('maps modern and tech names to modern', () => {
    expect(mapToAppTemplateFromName('Modern Professional', ['modern'])).toBe('modern');
    expect(mapToAppTemplateFromName('Tech Specialist', ['tech'])).toBe('modern');
  });

  test('maps classic/executive to classic', () => {
    expect(mapToAppTemplateFromName('Classic Executive', [])).toBe('classic');
    expect(mapToAppTemplateFromName('Executive Suite', [])).toBe('classic');
  });

  test('maps ats names/tags to ats', () => {
    expect(mapToAppTemplateFromName('ATS Optimized', [])).toBe('ats');
    expect(mapToAppTemplateFromName('Some template', ['ATS-Optimized'])).toBe('ats');
  });

  test('defaults to modern for unknowns', () => {
    expect(mapToAppTemplateFromName('Unknown Template', [])).toBe('modern');
  });
});
