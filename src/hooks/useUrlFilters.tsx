
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterOptions, EnergyType } from '@/lib/types';

export const useUrlFilters = (
  filterOptions: FilterOptions, 
  onFilterChange: (filters: FilterOptions) => void
) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle URL parameters for filtering
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const typeParam = searchParams.get('type');
    const featuredParam = searchParams.get('featured');
    const searchParam = searchParams.get('search');
    const countryParam = searchParams.get('country');
    
    let newFilters = { ...filterOptions };
    
    if (typeParam) {
      newFilters.energyTypes = [typeParam as EnergyType];
    }
    
    if (featuredParam === 'true') {
      newFilters.featured = true;
    }
    
    if (searchParam) {
      newFilters.searchTerm = searchParam;
    }
    
    if (countryParam) {
      newFilters.countries = [countryParam];
    }
    
    onFilterChange(newFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Update URL based on filters
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filterOptions.energyTypes.length === 1) {
      params.set('type', filterOptions.energyTypes[0]);
    }
    
    if (filterOptions.featured) {
      params.set('featured', 'true');
    }
    
    if (filterOptions.searchTerm) {
      params.set('search', filterOptions.searchTerm);
    }
    
    if (filterOptions.countries.length === 1) {
      params.set('country', filterOptions.countries[0]);
    }
    
    const search = params.toString();
    if (search) {
      navigate({ search }, { replace: true });
    } else if (location.search) {
      navigate({ search: '' }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]);

  return;
};
