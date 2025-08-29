import { cva } from 'class-variance-authority';

export const textVariants = cva(
  // Base styles
  'font-sans',
  {
    variants: {
      variant: {
        default: 'font-normal',
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        heading: 'font-bold tracking-tight',
        subtitle: 'font-medium tracking-wide',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
      },
      color: {
        primary: 'text-blue-600',
        secondary: 'text-gray-600',
        success: 'text-green-600',
        error: 'text-red-600',
        warning: 'text-yellow-600',
        neutral: 'text-gray-900',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      color: 'neutral',
      align: 'left',
    },
  }
);