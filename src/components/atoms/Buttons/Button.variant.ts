// src/components/atoms/Button/Button.variants.ts
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  // base styles
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
        outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500',
        ghost: 'text-blue-500 hover:bg-blue-50 focus:ring-blue-500',
        link: 'bg-transparent text-blue-500 underline px-0 py-0 min-h-0 shadow-none hover:text-blue-700 focus:ring-0',
      },
      size: {
        sm: 'px-3 py-2 text-sm min-h-[32px]',
        md: 'px-4 py-3 text-base min-h-[40px]',
        lg: 'px-6 py-4 text-lg min-h-[48px]',
        xl: 'px-8 py-5 text-xl min-h-[56px]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);