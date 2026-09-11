const RESERVED_SLUGS = ['about', 'team', 'join', 'join-tie', 'pillars', 'contact', 'events', '']

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function validateSlug(slug, pages, currentPageId) {
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return 'Use lowercase letters, numbers, and hyphens only.'
  }
  if (RESERVED_SLUGS.includes(slug)) {
    return 'That URL is already used by an existing page.'
  }
  if (pages.some((p) => p.id !== currentPageId && p.slug === slug)) {
    return 'Another page already uses that URL.'
  }
  return ''
}
