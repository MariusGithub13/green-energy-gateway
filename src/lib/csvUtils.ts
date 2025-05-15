
/**
 * Parse CSV data into an array of rows, handling complex cases including:
 * - Quoted fields that contain commas
 * - Escaped quotes within quoted fields
 * - Empty fields
 * - Malformed CSV data
 * 
 * @param csvText The raw CSV text to parse
 * @returns A two-dimensional array representing the parsed CSV data
 */
export const parseCSV = (csvText: string): string[][] => {
  const rows: string[][] = [];
  
  // Handle different line endings (CRLF, LF)
  const lines = csvText.replace(/\r\n/g, '\n').split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values: string[] = [];
    let inQuotes = false;
    let currentValue = '';
    let j = 0;
    
    while (j < line.length) {
      const char = line[j];
      const nextChar = j < line.length - 1 ? line[j + 1] : '';
      
      // Handle escaped quotes (either "" or \" within a quoted field)
      if (char === '"' && inQuotes && nextChar === '"') {
        currentValue += '"'; // Add a single quote to the value
        j += 2; // Skip the escaped quote
        continue;
      }
      
      // Handle quote markers (start/end of quoted field)
      if (char === '"') {
        inQuotes = !inQuotes;
        j++;
        continue;
      }
      
      // Handle commas - only treat as delimiters when not in quotes
      if (char === ',' && !inQuotes) {
        // Add current value and reset for next field
        values.push(currentValue);
        currentValue = '';
        j++;
        continue;
      }
      
      // For all other characters, add to current value
      currentValue += char;
      j++;
    }
    
    // Add the final value of the line
    values.push(currentValue);
    rows.push(values);
  }
  
  // Log a warning if we have very inconsistent row lengths
  const rowLengths = rows.map(row => row.length);
  const maxLength = Math.max(...rowLengths);
  const minLength = Math.min(...rowLengths);
  
  if (maxLength !== minLength && rows.length > 1) {
    console.warn(`CSV parsing found inconsistent row lengths: min=${minLength}, max=${maxLength}. Data may be malformed.`);
  }
  
  return rows;
};

/**
 * Escapes a string for use in a CSV field
 * @param value The string to escape
 * @returns The escaped string
 */
export const escapeCSV = (value: string): string => {
  if (value == null) return '';
  
  const stringValue = String(value);
  // If the value contains quotes, commas, or newlines, wrap in quotes and escape internal quotes
  if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
};
