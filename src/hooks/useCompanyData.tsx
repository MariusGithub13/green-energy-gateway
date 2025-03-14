
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Company, EnergyType, FilterOptions } from '@/lib/types';
import { 
  fetchCompanyData, 
  filterCompanies, 
  getUniqueFilterValues,
  getFeaturedCompanies 
} from '@/lib/companyData';

export const useCompanyData = (initialFilters: FilterOptions) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [featuredCompanies, setFeaturedCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initialFilters);
  const [filterValues, setFilterValues] = useState({
    countries: [] as string[],
    regions: [] as string[],
    energyTypes: [] as EnergyType[],
  });
  
  const { toast } = useToast();

  // Fetch companies data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCompanyData();
        setCompanies(data);
        
        // Set filter values
        const { countries, regions, energyTypes } = getUniqueFilterValues(data);
        setFilterValues({
          countries,
          regions,
          energyTypes,
        });
        
        // Get featured companies
        const featured = getFeaturedCompanies(data);
        setFeaturedCompanies(featured);
        
      } catch (error) {
        console.error('Error loading company data:', error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the company directory. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  // Apply filters when companies or filter options change
  useEffect(() => {
    if (companies.length > 0) {
      const filtered = filterCompanies(companies, filterOptions);
      setFilteredCompanies(filtered);
    }
  }, [companies, filterOptions]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
  };
  
  const resetFilters = () => {
    setFilterOptions({
      energyTypes: [],
      countries: [],
      regions: [],
      searchTerm: '',
      featured: false,
    });
  };

  return {
    companies,
    filteredCompanies,
    featuredCompanies,
    isLoading,
    filterOptions,
    filterValues,
    handleFilterChange,
    resetFilters
  };
};
