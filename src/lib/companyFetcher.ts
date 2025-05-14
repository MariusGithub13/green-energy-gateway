
import { Company, EnergyType } from "./types";
import { mockCompanies } from "./mockData";
import { parseCSV } from "./csvUtils";
import { validateURL, reportBlockedURLs } from "./urlUtils";
import { toast } from "sonner";

/**
 * Fetches company data from a remote CSV source
 */
export const fetchCompanyData = async (): Promise<Company[]> => {
  try {
    const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTH5EqgU9fQ8dqF9THZdMpGa4HpCeBEBzQfbx2OPcj1tJgr3WoveJdaHzRWFrVngcW-S_XFexZiPgGW/pub?output=csv";
    
    console.log("Fetching data from CSV URL...");
    
    const response = await fetch(CSV_URL, {
      cache: 'no-store',
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
    
    console.log("CSV Headers:", rows[0]);
    
    const dataRows = rows.slice(1);
    
    console.log(`Successfully fetched ${dataRows.length} companies from CSV`);
    
    const companies = dataRows.map((row, index) => {
      if (row.length < 4) {
        console.warn(`Row ${index + 2} has insufficient data, skipping`);
        return null;
      }
      
      const energyTypesStr = row[3] || "";
      const energyTypes = energyTypesStr
        .split(",")
        .map(type => type.trim().toLowerCase())
        .filter(type => ["solar", "wind", "hydro", "geothermal", "biomass", "other"].includes(type)) as EnergyType[];
      
      let websiteUrl = '#';
      if (row[5] && row[5].trim()) {
        websiteUrl = validateURL(row[5]);
      }
      
      const country = row[1] && row[1].trim() ? row[1].trim() : "Unknown";
      
      const isFeatured = row[10] && row[10].trim().toLowerCase() === 'featured';
      
      return {
        id: String(index + 1),
        name: row[2] || `Company ${index + 1}`,
        website: websiteUrl,
        description: row[4] || "No description provided",
        energyTypes: energyTypes.length > 0 ? energyTypes : ["other"],
        location: row[0] || "Unknown",
        country: country,
        region: row[0] || undefined,
        founded: undefined,
        logo: row[7] || undefined,
        featured: isFeatured,
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
    
    // Log any URLs that were sanitized or blocked
    let sanitizedCount = 0;
    companies.forEach((company, index) => {
      const originalRow = dataRows[parseInt(company.id) - 1];
      if (company.website === '#' && originalRow[5] && originalRow[5].trim()) {
        sanitizedCount++;
        console.warn(`Blocked potentially unsafe URL for company: ${company.name}`);
      }
    });
    
    reportBlockedURLs(sanitizedCount);
    
    return companies;
    
  } catch (error) {
    console.error("Error fetching company data:", error);
    toast.error("Could not load company data from the server. Showing sample data instead.");
    return mockCompanies;
  }
};
