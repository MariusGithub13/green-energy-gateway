
/**
 * Generates a URL-friendly slug from a company name
 */
export const generateSlug = (name) => {
  const slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove consecutive hyphens

  return `${slug}.html`;
};

