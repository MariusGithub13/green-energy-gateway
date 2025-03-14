
import { Company, FilterOptions } from "./types";
import { toast } from "sonner";

// Mock data for when the API fails or for development
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "SolarTech Industries",
    website: "https://example.com/solartech",
    description: "Leading provider of solar panel solutions for residential and commercial use.",
    energyTypes: ["solar"],
    location: "California",
    country: "USA",
    founded: 2010,
    featured: true,
    services: ["Installation", "Maintenance", "Consulting"],
    tags: ["solar panels", "renewable", "green energy"]
  },
  {
    id: "2",
    name: "WindForce Energy",
    website: "https://example.com/windforce",
    description: "Specializing in wind turbine manufacturing and wind farm development.",
    energyTypes: ["wind"],
    location: "Texas",
    country: "USA",
    founded: 2008,
    featured: true,
    services: ["Manufacturing", "Development", "Maintenance"],
    tags: ["wind power", "turbines", "renewable"]
  },
  {
    id: "3",
    name: "HydroFlow Systems",
    website: "https://example.com/hydroflow",
    description: "Innovative hydroelectric power solutions for various scales.",
    energyTypes: ["hydro"],
    location: "Oregon",
    country: "USA",
    founded: 2012,
    featured: false,
    services: ["Dam Construction", "Turbine Installation", "Maintenance"],
    tags: ["hydroelectric", "water power", "renewable"]
  },
  {
    id: "4",
    name: "GeoThermal Innovations",
    website: "https://example.com/geothermal",
    description: "Harnessing the Earth's heat for sustainable energy production.",
    energyTypes: ["geothermal"],
    location: "Nevada",
    country: "USA",
    founded: 2015,
    featured: false,
    services: ["Site Assessment", "System Design", "Installation"],
    tags: ["geothermal", "earth energy", "sustainable"]
  },
  {
    id: "5",
    name: "BioEnergy Solutions",
    website: "https://example.com/bioenergy",
    description: "Converting organic materials into clean, renewable energy.",
    energyTypes: ["biomass"],
    location: "Iowa",
    country: "USA",
    founded: 2013,
    featured: false,
    services: ["Biomass Processing", "Energy Conversion", "Consulting"],
    tags: ["biomass", "organic", "biofuel"]
  }
];

// Updated to use direct fetch with a working fallback strategy
export const fetchCompanyData = async (): Promise<Company[]> => {
  try {
    // Try to fetch from Google Sheets
    // Use a proper API key or an environment variable
    const API_KEY = "AIzaSyDTgA3EwpQpE7PXroxSzFpeuNQlAu7Nj-o"; // Replace with a valid API key
    const SPREADSHEET_ID = "1fyUjRSWLr0psb_F_-kO_LqF3r6ZvUWg5ct1fxLFnKMU";
    const RANGE = "Sheet1!A2:Z1000";
    
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
    );
    
    if (!response.ok) {
      console.error("Google Sheets API response not OK:", await response.json());
      throw new Error("Failed to fetch data from Google Sheets");
    }
    
    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      console.warn("No data found in Google Sheet, using mock data");
      return mockCompanies;
    }
    
    // Transform the sheet data into Company objects
    return data.values.map((row: any[], index: number) => {
      // Ensure we have at least the minimum required fields
      if (row.length < 4) {
        console.warn(`Row ${index + 2} has insufficient data, skipping`);
        return null;
      }
      
      // Parse energy types as an array
      const energyTypesStr = row[3] || "";
      const energyTypes = energyTypesStr
        .split(",")
        .map(type => type.trim().toLowerCase())
        .filter(type => ["solar", "wind", "hydro", "geothermal", "biomass", "other"].includes(type)) as any[];
      
      // Validate the URL
      let website = row[1] || "";
      try {
        new URL(website);
      } catch (e) {
        console.warn(`Invalid URL in row ${index + 2}: ${website}`);
        website = "#"; // Placeholder for invalid URLs
      }
      
      // Create a company object
      return {
        id: String(index + 1),
        name: row[0] || `Company ${index + 1}`,
        website: website,
        description: row[2] || "No description provided",
        energyTypes: energyTypes.length > 0 ? energyTypes : ["other"],
        location: row[4] || "Unknown",
        country: row[5] || "Unknown",
        region: row[6] || undefined,
        founded: row[7] ? Number(row[7]) : undefined,
        logo: row[8] || undefined,
        featured: row[9] === "TRUE" || row[9] === "true" || row[9] === "1",
        contactEmail: row[10] || undefined,
        contactPhone: row[11] || undefined,
        socialMedia: {
          linkedin: row[12] || undefined,
          twitter: row[13] || undefined,
          facebook: row[14] || undefined,
          instagram: row[15] || undefined,
        },
        services: row[16] ? row[16].split(",").map((s: string) => s.trim()) : undefined,
        products: row[17] ? row[17].split(",").map((p: string) => p.trim()) : undefined,
        certifications: row[18] ? row[18].split(",").map((c: string) => c.trim()) : undefined,
        tags: row[19] ? row[19].split(",").map((t: string) => t.trim()) : undefined,
      };
    }).filter(Boolean) as Company[];
    
  } catch (error) {
    console.error("Error fetching company data:", error);
    // Fallback to mock data if API request fails
    toast.error("Could not load company data from the server. Showing sample data instead.");
    return mockCompanies;
  }
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
