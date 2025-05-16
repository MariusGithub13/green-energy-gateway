
import { Company } from "./types";
import { generateSlug } from "./slugUtils";

/**
 * Finds a company by its ID
 */
export const getCompanyById = (companies: Company[], id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

/**
 * Finds a company by its slug, with or without .html extension
 */
export const getCompanyBySlug = (companies: Company[], slug: string): Company | undefined => {
  // Remove .html extension if present for comparison
  const normalizedSlug = slug.endsWith('.html') ? slug.slice(0, -5) : slug;
  
  return companies.find(company => {
    const companySlug = generateSlug(company.name);
    // Remove .html from generated slug for comparison
    const normalizedCompanySlug = companySlug.endsWith('.html') 
      ? companySlug.slice(0, -5) 
      : companySlug;
      
    return normalizedCompanySlug === normalizedSlug;
  });
};

/**
 * Gets all featured companies, sorted by name
 */
export const getFeaturedCompanies = (companies: Company[]): Company[] => {
  return companies.filter(company => company.featured).sort((a, b) => a.name.localeCompare(b.name));
};
