
import { useState } from 'react';
import { FilterOptions, EnergyType } from '@/lib/types';
import { Search, Filter, X, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getEnergyTypeColor } from '@/lib/companyData';

interface FilterPanelProps {
  countries: string[];
  regions: string[];
  energyTypes: EnergyType[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
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

  const toggleFeatured = () => {
    onFilterChange({ ...filters, featured: !filters.featured });
  };

  const hasActiveFilters = () => {
    return (
      filters.energyTypes.length > 0 ||
      filters.countries.length > 0 ||
      filters.regions.length > 0 ||
      filters.featured ||
      filters.searchTerm
    );
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
      default:
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg border p-4 md:p-6 mb-6 shadow-sm animate-in">
      <div className="flex flex-col space-y-4">
        {/* Search bar - always visible */}
        <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search renewable companies..."
              className="pl-10 w-full"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
          <Button type="submit" variant="default">
            Search
          </Button>
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
        </form>

        {/* Active filters display */}
        {hasActiveFilters() && (
          <div className="flex flex-wrap gap-2 pt-2">
            {filters.searchTerm && (
              <Badge variant="outline" className="flex items-center gap-1">
                Search: {filters.searchTerm}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSingleFilter('search')}
                />
              </Badge>
            )}
            
            {filters.energyTypes.map(type => (
              <Badge
                key={type}
                variant="outline"
                className={cn(
                  "flex items-center gap-1",
                  `border-${getEnergyTypeColor(type)}/40 bg-${getEnergyTypeColor(type)}/10 text-${getEnergyTypeColor(type)}`
                )}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSingleFilter('energyType', type)}
                />
              </Badge>
            ))}
            
            {filters.countries.map(country => (
              <Badge key={country} variant="outline" className="flex items-center gap-1">
                {country}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSingleFilter('country', country)}
                />
              </Badge>
            ))}
            
            {filters.regions.map(region => (
              <Badge key={region} variant="outline" className="flex items-center gap-1">
                {region}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSingleFilter('region', region)}
                />
              </Badge>
            ))}
            
            {filters.featured && (
              <Badge variant="outline" className="flex items-center gap-1 border-primary/40 bg-primary/10 text-primary">
                Featured
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSingleFilter('featured')}
                />
              </Badge>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={onReset}
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Expandable filters section */}
        {isExpanded && (
          <div className="grid gap-4 pt-4 border-t">
            <div>
              <h3 className="text-sm font-medium mb-2">Energy Type</h3>
              <div className="flex flex-wrap gap-2">
                {energyTypes.map((type) => (
                  <div
                    key={type}
                    onClick={() => handleEnergyTypeToggle(type)}
                    className={cn(
                      "flex items-center bg-white rounded-full px-3 py-1.5 text-sm border cursor-pointer transition-all",
                      filters.energyTypes.includes(type)
                        ? `border-${getEnergyTypeColor(type)} bg-${getEnergyTypeColor(type)}/10 text-${getEnergyTypeColor(type)}`
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    {filters.energyTypes.includes(type) && (
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                    )}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Countries</h3>
                <div className="max-h-40 overflow-y-auto pr-2 space-y-1">
                  {countries.map((country) => (
                    <div key={country} className="flex items-center space-x-2">
                      <Checkbox
                        id={`country-${country}`}
                        checked={filters.countries.includes(country)}
                        onCheckedChange={() => handleCountryToggle(country)}
                      />
                      <label
                        htmlFor={`country-${country}`}
                        className="text-sm cursor-pointer"
                      >
                        {country}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Regions</h3>
                <div className="max-h-40 overflow-y-auto pr-2 space-y-1">
                  {regions.map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox
                        id={`region-${region}`}
                        checked={filters.regions.includes(region)}
                        onCheckedChange={() => handleRegionToggle(region)}
                      />
                      <label
                        htmlFor={`region-${region}`}
                        className="text-sm cursor-pointer"
                      >
                        {region}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured-only"
                checked={filters.featured}
                onCheckedChange={toggleFeatured}
              />
              <label
                htmlFor="featured-only"
                className="text-sm font-medium cursor-pointer"
              >
                Featured companies only
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
