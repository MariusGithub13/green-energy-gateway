
// Re-export all company data utilities from specialized files
import { getEnergyTypeColor } from "./energyUtils";
import { getUniqueFilterValues, filterCompanies } from "./filterUtils";
import { getCompanyById, getCompanyBySlug, getFeaturedCompanies } from "./companyLookup";
import { generateSlug } from "./slugUtils";
import { fetchCompanyData } from "./companyFetcher";

// Export all functions
export {
  getCompanyById,
  getCompanyBySlug,
  generateSlug,
  getFeaturedCompanies,
  fetchCompanyData,
  getEnergyTypeColor,
  getUniqueFilterValues, 
  filterCompanies
};
