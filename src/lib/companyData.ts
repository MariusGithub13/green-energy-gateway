import { Company, FilterOptions, EnergyType } from "./types";
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

// Energy type color mapping function
export const getEnergyTypeColor = (type: EnergyType): string => {
  switch (type) {
    case "solar":
      return "yellow-600";
    case "wind":
      return "blue-500";
    case "hydro":
      return "cyan-600";
    case "geothermal":
      return "orange-600";
    case "biomass":
      return "green-600";
    case "other":
      return "purple-500";
    default:
      return "gray-500";
  }
};

// Function to get a company by its ID
export const getCompanyById = (companies: Company[], id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

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

// Function to get featured companies
export const getFeaturedCompanies = (companies: Company[]): Company[] => {
  return companies.filter(company => company.featured).sort((a, b) => a.name.localeCompare(b.name));
};

// Parse CSV data into an array of rows
const parseCSV = (csvText: string): string[][] => {
  const rows: string[][] = [];
  const lines = csvText.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values: string[] = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    
    values.push(currentValue); // Add the last value
    rows.push(values);
  }
  
  return rows;
};

// Updated to fetch from CSV URL
export const fetchCompanyData = async (): Promise<Company[]> => {
  try {
    const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTH5EqgU9fQ8dqF9THZdMpGa4HpCeBEBzQfbx2OPcj1tJgr3WoveJdaHzRWFrVngcW-S_XFexZiPgGW/pub?output=csv";
    
    console.log("Fetching data from CSV URL...");
    
    const response = await fetch(CSV_URL);
    
    if (!response.ok) {
      console.error("CSV fetch response error:", response.status, response.statusText);
      throw new Error(`Failed to fetch data from CSV: ${response.status} ${response.statusText}`);
    }
    
    const csvText = await response.text();
    
    if (!csvText || csvText.trim().length === 0) {
      console.warn("No data found in CSV, using mock data");
      return mockCompanies;
    }
    
    const rows = parseCSV(csvText);
    
    // Skip the header row
    const dataRows = rows.slice(1);
    
    console.log(`Successfully fetched ${dataRows.length} companies from CSV`);
    
    // Transform the CSV data into Company objects
    const companies = dataRows.map((row, index) => {
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
        .filter(type => ["solar", "wind", "hydro", "geothermal", "biomass", "other"].includes(type)) as EnergyType[];
      
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
    
    return companies;
    
  } catch (error) {
    console.error("Error fetching company data:", error);
    // Show a more user-friendly error message
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
