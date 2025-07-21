
/**
 * Generates a URL-friendly slug from a company name
 */
export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
    .trim() + '.html'; // Add .html extension
};

