
import { toast } from "sonner";

/**
 * Formats a URL by ensuring it has a proper protocol prefix
 */
export const formatURL = (url: string): string => {
  if (!url || url.trim() === '') return '';
  
  if (!url.match(/^https?:\/\//i)) {
    return `https://${url}`;
  }
  
  return url;
};

/**
 * Checks if a URL is secure and doesn't contain potentially harmful content
 */
export const isSecureURL = (url: string): boolean => {
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

/**
 * Validates and formats a URL, returning a safe URL or '#' if invalid
 */
export const validateURL = (url: string): string => {
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

/**
 * Tracks and reports blocked URLs
 */
export const reportBlockedURLs = (sanitizedCount: number): void => {
  if (sanitizedCount > 0) {
    console.warn(`Blocked ${sanitizedCount} potentially unsafe URLs`);
    toast.warning(`${sanitizedCount} potentially unsafe URLs were blocked for security reasons.`);
  }
};
