
import { Company, EnergyType, FilterOptions } from './types';

const SPREADSHEET_ID = '1fyUjRSWLr0psb_F_-kO_LqF3r6ZvUWg5ct1fxLFnKMU';
const SHEET_ID = '0';
const API_KEY = 'AIzaSyBwbBNK8LsK0vG8jbYxEZB-n9KvnRj5lXU'; // This is a read-only API key specifically for Google Sheets public data

// Fetch data from Google Sheets
export async function fetchCompanyData(): Promise<Company[]> {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A2:Z1000?key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    const rows = data.values || [];
    
    return rows.map((row: any[], index: number) => {
      // Handle potentially missing columns with default values
      const energyTypesString = row[2] || '';
      const energyTypes = energyTypesString
        .split(',')
        .map(type => type.trim().toLowerCase())
        .filter(type => type) as EnergyType[];
      
      const website = row[1] || '';
      
      // Basic URL validation - skip entries with invalid or suspicious URLs
      if (!isValidUrl(website)) {
        return null;
      }
      
      return {
        id: `company-${index}`,
        name: row[0] || 'Unknown Company',
        website,
        description: row[3] || 'No description available',
        energyTypes: energyTypes.length ? energyTypes : ['other'],
        location: row[4] || 'Unknown',
        country: row[5] || 'Unknown',
        region: row[6] || undefined,
        founded: row[7] ? parseInt(row[7], 10) : undefined,
        logo: row[8] || `/placeholder.svg`,
        featured: row[9] === 'TRUE' || row[9] === 'true' || false,
        contactEmail: row[10] || undefined,
        contactPhone: row[11] || undefined,
        socialMedia: {
          linkedin: row[12] || undefined,
          twitter: row[13] || undefined,
          facebook: row[14] || undefined,
          instagram: row[15] || undefined,
        },
        services: row[16] ? row[16].split(',').map((s: string) => s.trim()) : [],
        products: row[17] ? row[17].split(',').map((p: string) => p.trim()) : [],
        certifications: row[18] ? row[18].split(',').map((c: string) => c.trim()) : [],
        tags: row[19] ? row[19].split(',').map((t: string) => t.trim()) : [],
      };
    }).filter(Boolean) as Company[]; // Remove any null entries from invalid URLs
  } catch (error) {
    console.error('Error fetching company data:', error);
    return [];
  }
}

// URL validation to prevent harmful links
function isValidUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    const parsedUrl = new URL(url);
    
    // Check for HTTP/HTTPS protocol
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return false;
    }
    
    // Check for suspicious file extensions that could indicate downloadable executables
    const suspiciousExtensions = ['.exe', '.dll', '.bat', '.cmd', '.msi', '.apk', '.dmg', '.bin', '.js', '.php'];
    if (suspiciousExtensions.some(ext => parsedUrl.pathname.toLowerCase().endsWith(ext))) {
      return false;
    }
    
    return true;
  } catch (e) {
    return false;
  }
}

// Filter companies based on filter options
export function filterCompanies(companies: Company[], filters: FilterOptions): Company[] {
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
    
    // Filter by featured
    if (filters.featured && !company.featured) {
      return false;
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      return (
        company.name.toLowerCase().includes(searchTermLower) ||
        company.description.toLowerCase().includes(searchTermLower) ||
        company.energyTypes.some(type => type.toLowerCase().includes(searchTermLower)) ||
        company.country.toLowerCase().includes(searchTermLower) ||
        (company.region && company.region.toLowerCase().includes(searchTermLower)) ||
        (company.tags && company.tags.some(tag => tag.toLowerCase().includes(searchTermLower)))
      );
    }
    
    return true;
  });
}

// Get unique values for filter dropdowns
export function getUniqueFilterValues(companies: Company[]) {
  const countries = new Set<string>();
  const regions = new Set<string>();
  const energyTypesSet = new Set<EnergyType>();
  
  companies.forEach(company => {
    countries.add(company.country);
    if (company.region) regions.add(company.region);
    company.energyTypes.forEach(type => energyTypesSet.add(type));
  });
  
  return {
    countries: Array.from(countries).sort(),
    regions: Array.from(regions).sort(),
    energyTypes: Array.from(energyTypesSet).sort(),
  };
}

// Get a single company by ID
export function getCompanyById(companies: Company[], id: string): Company | undefined {
  return companies.find(company => company.id === id);
}

// Get featured companies
export function getFeaturedCompanies(companies: Company[]): Company[] {
  return companies.filter(company => company.featured);
}

// Get energy type color
export function getEnergyTypeColor(type: EnergyType): string {
  switch (type) {
    case 'solar':
      return 'renewable-solar';
    case 'wind':
      return 'renewable-wind';
    case 'hydro':
      return 'renewable-hydro';
    case 'geothermal':
      return 'renewable-geo';
    case 'biomass':
      return 'renewable-bio';
    default:
      return 'renewable';
  }
}
