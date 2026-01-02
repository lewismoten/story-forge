export const safeSlug = (slug, fallback="untitled") => 
  slug.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60)
  || fallback;