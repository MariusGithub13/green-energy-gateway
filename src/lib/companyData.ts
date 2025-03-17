
import { Company, FilterOptions, EnergyType } from "./types";
import { mockCompanies } from "./mockData";
import { getEnergyTypeColor } from "./energyUtils";
import { parseCSV } from "./csvUtils";
import { getUniqueFilterValues, filterCompanies } from "./filterUtils";
import { toast } from "sonner";

// Function to get a company by its ID
export const getCompanyById = (companies: Company[], id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

// Function to get featured companies
export const getFeaturedCompanies = (companies: Company[]): Company[] => {
  return companies.filter(company => company.featured).sort((a, b) => a.name.localeCompare(b.name));
};

// Helper to ensure URL has proper format
const formatURL = (url: string): string => {
  if (!url || url.trim() === '') return '';
  
  // Check if URL starts with http:// or https://
  if (!url.match(/^https?:\/\//i)) {
    return `https://${url}`;
  }
  
  return url;
};

// Improved function to validate URLs
const validateURL = (url: string): string => {
  if (!url || url.trim() === '') return '#';
  
  try {
    const formattedUrl = formatURL(url.trim());
    new URL(formattedUrl); // This will throw if invalid
    return formattedUrl;
  } catch (e) {
    console.warn(`Invalid URL: ${url}`);
    return '#'; // Placeholder for invalid URLs
  }
};

// Updated to fetch from CSV URL with improved data handling
export const fetchCompanyData = async (): Promise<Company[]> => {
  try {
    const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTH5EqgU9fQ8dqF9THZdMpGa4HpCeBEBzQfbx2OPcj1tJgr3WoveJdaHzRWFrVngcW-S_XFexZiPgGW/pub?output=csv";
    
    console.log("Fetching data from CSV URL...");
    
    const response = await fetch(CSV_URL, {
      cache: 'no-store', // Ensure we get fresh data
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
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
    
    // Log the headers to better understand the data structure
    console.log("CSV Headers:", rows[0]);
    
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
      
      // Get website - try first from the appropriate column (6), but fallback to column 1 if needed
      // Column indices might vary, so we attempt to find the best match
      let websiteUrl;
      if (row[6] && row[6].trim()) {
        websiteUrl = validateURL(row[6]);
      } else if (row[1] && row[1].trim()) {
        websiteUrl = validateURL(row[1]);
      } else {
        websiteUrl = '#';
      }
      
      // Create a company object
      return {
        id: String(index + 1),
        name: row[2] || `Company ${index + 1}`,
        website: websiteUrl,
        description: row[4] || "No description provided",
        energyTypes: energyTypes.length > 0 ? energyTypes : ["other"],
        location: row[0] || "Unknown",
        country: row[1] || "Unknown",
        region: row[0] || undefined,
        founded: undefined,
        logo: row[7] || undefined,
        featured: row[8] === "published" || false,
        contactEmail: undefined,
        contactPhone: undefined,
        socialMedia: {
          linkedin: undefined,
          twitter: undefined,
          facebook: undefined,
          instagram: undefined,
        },
        services: undefined,
        products: undefined,
        certifications: undefined,
        tags: row[9] ? row[9].split(";").map((t: string) => t.trim()) : undefined,
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

export { getEnergyTypeColor, getUniqueFilterValues, filterCompanies };
