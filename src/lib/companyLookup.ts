
import { Company } from "./types";
import { generateSlug } from "./slugUtils";

/**
 * Finds a company by its ID
 */
export const getCompanyById = (companies: Company[], id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

/**
 * Finds a company by its slug
 */
export const getCompanyBySlug = (companies: Company[], slug: string): Company | undefined => {
  return companies.find(company => generateSlug(company.name) === slug);
};

/**
 * Gets all featured companies, sorted by name
 */
export const getFeaturedCompanies = (companies: Company[]): Company[] => {
  return companies.filter(company => company.featured).sort((a, b) => a.name.localeCompare(b.name));
};
