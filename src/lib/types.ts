
export type EnergyType = 'solar' | 'wind' | 'hydro' | 'geothermal' | 'biomass' | 'other';

export interface Company {
  id: string;
  name: string;
  website: string;
  description: string;
  energyTypes: EnergyType[];
  location: string;
  country: string;
  region?: string;
  founded?: number;
  logo?: string;
  featured: boolean;
  contactEmail?: string;
  contactPhone?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  services?: string[];
  products?: string[];
  certifications?: string[];
  tags?: string[];
}

export interface FilterOptions {
  energyTypes: EnergyType[];
  countries: string[];
  regions: string[];
  searchTerm: string;
  featured: boolean;
}

export interface ContactFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  website: string;
  energyTypes: EnergyType[];
  description: string;
  message?: string;
}
