
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FilterOptions, EnergyType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getEnergyTypeColor } from '@/lib/companyData';

interface ActiveFiltersProps {
  filters: FilterOptions;
  onRemoveFilter: (type: 'energyType' | 'country' | 'region' | 'featured' | 'search', value?: string) => void;
  onReset: () => void;
}

const ActiveFilters = ({ filters, onRemoveFilter, onReset }: ActiveFiltersProps) => {
  const hasActiveFilters = () => {
    return (
      filters.energyTypes.length > 0 ||
      filters.countries.length > 0 ||
      filters.regions.length > 0 ||
      filters.featured ||
      filters.searchTerm
    );
  };

  if (!hasActiveFilters()) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {filters.searchTerm && (
        <Badge variant="outline" className="flex items-center gap-1">
          Search: {filters.searchTerm}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter('search')}
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
            onClick={() => onRemoveFilter('energyType', type)}
          />
        </Badge>
      ))}
      
      {filters.countries.map(country => (
        <Badge key={country} variant="outline" className="flex items-center gap-1">
          {country}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter('country', country)}
          />
        </Badge>
      ))}
      
      {filters.regions.map(region => (
        <Badge key={region} variant="outline" className="flex items-center gap-1">
          {region}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter('region', region)}
          />
        </Badge>
      ))}
      
      {filters.featured && (
        <Badge variant="outline" className="flex items-center gap-1 border-primary/40 bg-primary/10 text-primary">
          Featured
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter('featured')}
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
  );
};

export default ActiveFilters;
