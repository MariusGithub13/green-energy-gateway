
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

export { getEnergyTypeColor, getUniqueFilterValues, filterCompanies };
