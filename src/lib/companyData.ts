
import { Company, FilterOptions, EnergyType } from "./types";
import { mockCompanies } from "./mockData";
import { getEnergyTypeColor } from "./energyUtils";
import { parseCSV } from "./csvUtils";
import { getUniqueFilterValues, filterCompanies } from "./filterUtils";
import { toast } from "sonner";

export const getCompanyById = (companies: Company[], id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

export const getFeaturedCompanies = (companies: Company[]): Company[] => {
  return companies.filter(company => company.featured).sort((a, b) => a.name.localeCompare(b.name));
};

const formatURL = (url: string): string => {
  if (!url || url.trim() === '') return '';
  
  if (!url.match(/^https?:\/\//i)) {
    return `https://${url}`;
  }
  
  return url;
};

const isSecureURL = (url: string): boolean => {
  if (!url || url.trim() === '') return false;
  
  // Only allow http:// or https:// URLs
  if (!url.match(/^https?:\/\//i)) return false;
  
  // Block potentially dangerous protocols
  const dangerousProtocols = [
    'javascript:', 'data:', 'vbscript:', 
    'file:', 'ftp:', 'ws:', 'wss:',
    'about:', 'blob:', 'magnet:'
  ];
  
  for (const protocol of dangerousProtocols) {
    if (url.toLowerCase().includes(protocol)) return false;
  }
  
  // Block URLs with suspicious keywords
  const suspiciousKeywords = [
    'malware', 'virus', 'trojan', 'phishing', 
    'hack', 'crack', 'keygen', 'warez', 'pirate',
    'torrent', 'exploit', 'payload', 'attack'
  ];
  
  for (const keyword of suspiciousKeywords) {
    if (url.toLowerCase().includes(keyword)) return false;
  }
  
  // Block URLs with executable file extensions
  const dangerousExtensions = [
    '.exe', '.bat', '.cmd', '.msi', '.vbs', 
    '.js', '.jar', '.dll', '.sh', '.app', 
    '.dmg', '.apk', '.deb', '.rpm'
  ];
  
  for (const ext of dangerousExtensions) {
    if (url.toLowerCase().endsWith(ext)) return false;
  }
  
  return true;
};

const validateURL = (url: string): string => {
  if (!url || url.trim() === '') return '#';
  
  try {
    const formattedUrl = formatURL(url.trim());
    
    // Check if URL is valid
    new URL(formattedUrl);
    
    // Verify URL is secure
    if (!isSecureURL(formattedUrl)) {
      console.warn(`Potentially unsafe URL blocked: ${url}`);
      return '#';
    }
    
    return formattedUrl;
  } catch (e) {
    console.warn(`Invalid URL: ${url}`);
    return '#';
  }
};

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
    
    if (sanitizedCount > 0) {
      console.warn(`Blocked ${sanitizedCount} potentially unsafe URLs`);
      toast.warning(`${sanitizedCount} potentially unsafe URLs were blocked for security reasons.`);
    }
    
    return companies;
    
  } catch (error) {
    console.error("Error fetching company data:", error);
    toast.error("Could not load company data from the server. Showing sample data instead.");
    return mockCompanies;
  }
};

export { getEnergyTypeColor, getUniqueFilterValues, filterCompanies };
