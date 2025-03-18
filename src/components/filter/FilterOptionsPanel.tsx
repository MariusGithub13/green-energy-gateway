
import { Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { EnergyType } from '@/lib/types';
import { getEnergyTypeColor } from '@/lib/companyData';

interface FilterOptionsProps {
  energyTypes: EnergyType[];
  selectedEnergyTypes: EnergyType[];
  countries: string[];
  selectedCountries: string[];
  regions: string[];
  selectedRegions: string[];
  featured: boolean;
  onEnergyTypeToggle: (type: EnergyType) => void;
  onCountryToggle: (country: string) => void;
  onRegionToggle: (region: string) => void;
  onFeaturedToggle: () => void;
}

const FilterOptions = ({
  energyTypes,
  selectedEnergyTypes,
  countries,
  selectedCountries,
  regions,
  selectedRegions,
  featured,
  onEnergyTypeToggle,
  onCountryToggle,
  onRegionToggle,
  onFeaturedToggle,
}: FilterOptionsProps) => {
  return (
    <div className="grid gap-4 pt-4 border-t">
      <div>
        <h3 className="text-sm font-medium mb-2">Energy Type</h3>
        <div className="flex flex-wrap gap-2">
          {energyTypes.map((type) => (
            <div
              key={type}
              onClick={() => onEnergyTypeToggle(type)}
              className={cn(
                "flex items-center bg-white rounded-full px-3 py-1.5 text-sm border cursor-pointer transition-all",
                selectedEnergyTypes.includes(type)
                  ? `border-${getEnergyTypeColor(type)} bg-${getEnergyTypeColor(type)}/10 text-${getEnergyTypeColor(type)}`
                  : "border-border hover:border-muted-foreground"
              )}
            >
              {selectedEnergyTypes.includes(type) && (
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
                  checked={selectedCountries.includes(country)}
                  onCheckedChange={() => onCountryToggle(country)}
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
                  checked={selectedRegions.includes(region)}
                  onCheckedChange={() => onRegionToggle(region)}
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
          checked={featured}
          onCheckedChange={onFeaturedToggle}
        />
        <label
          htmlFor="featured-only"
          className="text-sm font-medium cursor-pointer"
        >
          Featured companies only
        </label>
      </div>
    </div>
  );
};

export default FilterOptions;
