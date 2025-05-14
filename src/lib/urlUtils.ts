
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
 * @param url The URL to check
 * @returns boolean indicating if the URL passes security checks
 */
export const isSecureURL = (url: string): boolean => {
  if (!url || url.trim() === '') return false;
  
  // Create a lowercase version for case-insensitive checks
  const lowerUrl = url.toLowerCase();
  
  // Only allow http:// or https:// URLs
  if (!lowerUrl.match(/^https?:\/\//i)) return false;
  
  // Combined array of patterns to block
  const blockedPatterns = [
    // Dangerous protocols
    'javascript:', 'data:', 'vbscript:', 
    'file:', 'ftp:', 'ws:', 'wss:',
    'about:', 'blob:', 'magnet:',
    
    // Suspicious keywords
    '/malware', '/virus', '/trojan', '/phishing', 
    '/hack', '/crack', '/keygen', '/warez', '/pirate',
    '/torrent', '/exploit', '/payload', '/attack'
  ];
  
  // Check for dangerous patterns in a single loop
  if (blockedPatterns.some(pattern => lowerUrl.includes(pattern))) {
    return false;
  }
  
  // Check for dangerous file extensions in a single operation
  const dangerousExtensions = [
    '.exe', '.bat', '.cmd', '.msi', '.vbs', 
    '.js', '.jar', '.dll', '.sh', '.app', 
    '.dmg', '.apk', '.deb', '.rpm'
  ];
  
  // More efficient check for file extensions
  if (dangerousExtensions.some(ext => lowerUrl.endsWith(ext))) {
    return false;
  }
  
  return true;
};

/**
 * Validates and formats a URL, returning a safe URL or '#' if invalid
 * @param url The URL to validate and format
 * @returns A safe URL or '#' if the URL is invalid
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
 * @param sanitizedCount Number of URLs that were sanitized
 */
export const reportBlockedURLs = (sanitizedCount: number): void => {
  if (sanitizedCount > 0) {
    console.warn(`Blocked ${sanitizedCount} potentially unsafe URLs`);
    toast.warning(`${sanitizedCount} potentially unsafe URLs were blocked for security reasons.`);
  }
};
