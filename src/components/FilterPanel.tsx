import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FilterOptions as FilterOptionsType, EnergyType } from '@/lib/types';
import SearchBar from './filter/SearchBar';
import ActiveFilters from './filter/ActiveFilters';
import FilterOptionsPanel from './filter/FilterOptions';

interface FilterPanelProps {
  countries: string[];
  regions: string[];
  energyTypes: EnergyType[];
  filters: FilterOptionsType;
  onFilterChange: (filters: FilterOptionsType) => void;
  onReset: () => void;
}

const FilterPanel = ({
  countries,
  regions,
  energyTypes,
  filters,
  onFilterChange,
  onReset,
}: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.searchTerm);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, searchTerm: localSearch });
  };

  const handleEnergyTypeToggle = (type: EnergyType) => {
    const updatedTypes = filters.energyTypes.includes(type)
      ? filters.energyTypes.filter(t => t !== type)
      : [...filters.energyTypes, type];
    onFilterChange({ ...filters, energyTypes: updatedTypes });
  };

  const handleCountryToggle = (country: string) => {
    const updatedCountries = filters.countries.includes(country)
      ? filters.countries.filter(c => c !== country)
      : [...filters.countries, country];
    onFilterChange({ ...filters, countries: updatedCountries });
  };

  const handleRegionToggle = (region: string) => {
    const updatedRegions = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region];
    onFilterChange({ ...filters, regions: updatedRegions });
  };

  const handleFeaturedToggle = () => {
    onFilterChange({ ...filters, featured: !filters.featured });
  };

  const removeSingleFilter = (type: 'energyType' | 'country' | 'region' | 'featured' | 'search', value?: string) => {
    switch (type) {
      case 'energyType':
        if (value) {
          onFilterChange({
            ...filters,
            energyTypes: filters.energyTypes.filter(t => t !== value as EnergyType),
          });
        }
        break;
      case 'country':
        if (value) {
          onFilterChange({
            ...filters,
            countries: filters.countries.filter(c => c !== value),
          });
        }
        break;
      case 'region':
        if (value) {
          onFilterChange({
            ...filters,
            regions: filters.regions.filter(r => r !== value),
          });
        }
        break;
      case 'featured':
        onFilterChange({ ...filters, featured: false });
        break;
      case 'search':
        onFilterChange({ ...filters, searchTerm: '' });
        setLocalSearch('');
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg border p-4 md:p-6 mb-6 shadow-sm animate-in">
      <div className="flex flex-col space-y-4">
        <div className="flex w-full items-center space-x-2">
          <SearchBar
            searchTerm={localSearch}
            onSearchChange={setLocalSearch}
            onSearch={handleSearch}
          />
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
          </Button>
        </div>

        <ActiveFilters
          filters={filters}
          onRemoveFilter={removeSingleFilter}
          onReset={onReset}
        />

        {isExpanded && (
          <FilterOptionsPanel
            energyTypes={energyTypes}
            selectedEnergyTypes={filters.energyTypes}
            countries={countries}
            selectedCountries={filters.countries}
            regions={regions}
            selectedRegions={filters.regions}
            featured={filters.featured}
            onEnergyTypeToggle={handleEnergyTypeToggle}
            onCountryToggle={handleCountryToggle}
            onRegionToggle={handleRegionToggle}
            onFeaturedToggle={handleFeaturedToggle}
          />
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
