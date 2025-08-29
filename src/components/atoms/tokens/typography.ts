// global/typography.ts
export const typography = {
  fontSize: {
    xs: 12,    // Captions or fine print
    sm: 14,    // Small body text
    base: 16,  // Default text
    lg: 20,    // Larger for subheadings
    xl: 24,    // Bold headings
    '2xl': 32, // Prominent headers
    '3xl': 40, // Hero text
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800', // For strong sigma emphasis
  },
  lineHeight: {
    tight: '1.2',    // For headings
    normal: '1.6',   // Default body text
    relaxed: '2.0',  // For larger text or spacing
  },
  fontFamily: {
    sans: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif', // Sigma-style modern font
  },
} as const;