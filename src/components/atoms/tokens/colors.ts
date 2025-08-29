// global/colors.ts
export const colors = {
  primary: {
    50: '#eef7ff',    // Very light blue for backgrounds
    100: '#d1e5ff',
    300: '#76a9ff',   // Bright mid-blue for highlights
    500: '#3b82f6',   // Core blue (unchanged)
    700: '#1e40af',   // Deeper blue for buttons/active
    900: '#172554',   // Darkest blue for text or borders
  },
  secondary: {
    500: '#9333ea',   // Vibrant purple for secondary actions
    700: '#6b21a8',   // Darker purple for emphasis
  },
  gray: {
    50: '#f8fafc',
    200: '#e2e8f0',
    500: '#64748b',   // Adjusted to a softer gray
    700: '#334155',
    900: '#0f172a',   // Darker base for contrast
  },
  semantic: {
    error: '#dc2626',    // Bright red for errors
    success: '#16a34a',  // Rich green for success
    warning: '#d97706',  // Warm orange for warnings
  },
  accent: {
    500: '#f43f5e',   // Bold pinkish-red for accents
    700: '#be123c',   // Darker accent for hover
  },
  neutral: {
    200: '#e5e7eb',
    400: '#9ca3af',
    800: '#1e293b',   // Dark neutral for text
  },
} as const;