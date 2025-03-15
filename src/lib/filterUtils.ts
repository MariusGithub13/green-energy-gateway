
import { Company, FilterOptions, EnergyType } from "./types";

// Function to get unique filter values from company data
export const getUniqueFilterValues = (companies: Company[]) => {
  const countries = Array.from(new Set(companies.map(company => company.country)))
    .filter(Boolean)
    .sort();
  
  const regions = Array.from(new Set(companies.map(company => company.region)))
    .filter(Boolean)
    .sort() as string[];
  
  const energyTypesSet = new Set<EnergyType>();
  companies.forEach(company => {
    company.energyTypes.forEach(type => energyTypesSet.add(type));
  });
  
  const energyTypes = Array.from(energyTypesSet).sort() as EnergyType[];
  
  return { countries, regions, energyTypes };
};

export const filterCompanies = (companies: Company[], filters: FilterOptions): Company[] => {
  return companies.filter(company => {
    // Filter by energy types
    if (filters.energyTypes.length > 0 && 
        !company.energyTypes.some(type => filters.energyTypes.includes(type))) {
      return false;
    }
    
    // Filter by countries
    if (filters.countries.length > 0 && !filters.countries.includes(company.country)) {
      return false;
    }
    
    // Filter by regions
    if (filters.regions.length > 0 && company.region && 
        !filters.regions.includes(company.region)) {
      return false;
    }
    
    // Filter by featured status
    if (filters.featured && !company.featured) {
      return false;
    }
    
    // Search term matching in name, description, or tags
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const nameMatch = company.name.toLowerCase().includes(searchLower);
      const descMatch = company.description.toLowerCase().includes(searchLower);
      const tagsMatch = company.tags ? 
        company.tags.some(tag => tag.toLowerCase().includes(searchLower)) : 
        false;
      
      if (!nameMatch && !descMatch && !tagsMatch) {
        return false;
      }
    }
    
    return true;
  });
};
