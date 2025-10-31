/**
 * Calculates the appropriate contrast color (black or white) for a given background color
 * based on the WCAG relative luminance formula.
 * 
 * @param hexColor - The hexadecimal color string (with or without #) or null
 * @returns '#000000' for light backgrounds, '#ffffff' for dark backgrounds or null input
 */
export function getContrastColor(hexColor: string | null): string {
  if (!hexColor) return '#ffffff';
  
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance (WCAG formula)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Generates a random integer between min and max (inclusive).
 * 
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random integer between min and max
 */
export function getRandomInt(min: number, max: number): number {
  // Ensure min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);
  
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}