// TextInputField.variants.ts
import { cva } from 'class-variance-authority';

export const textFieldVariants = cva(
  // Base styles
  'flex-row items-center border rounded-lg bg-white',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-blue-500',
        outline: 'border-2 border-blue-500 bg-transparent focus:border-blue-700',
        underline: 'border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-blue-500',
        filled: 'bg-gray-100 border-0 focus:bg-gray-200',
      },
      size: {
        sm: 'px-3 py-2 min-h-[32px]',
        md: 'px-4 py-3 min-h-[40px]',
        lg: 'px-5 py-4 min-h-[48px]',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      error: {
        true: 'border-red-500',
        false: '',
      },
    },
    compoundVariants: [
      // Error states for each variant
      {
        variant: 'default',
        error: true,
        className: 'border-red-500',
      },
      {
        variant: 'outline',
        error: true,
        className: 'border-red-500',
      },
      {
        variant: 'underline',
        error: true,
        className: 'border-red-500',
      },
      {
        variant: 'filled',
        error: true,
        className: 'bg-red-50',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
      error: false,
    },
  }
);

export const textInputVariants = cva(
  'flex-1 text-black', // Base text input styles
  {
    variants: {
      variant: {
        default: 'text-gray-900',
        outline: 'text-blue-900',
        underline: 'text-gray-900',
        filled: 'text-gray-900',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      error: {
        true: 'text-red-900',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      error: false,
    },
  }
);

export const labelVariants = cva(
  'mb-1', // Base label styles
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      error: {
        true: 'text-red-700',
        false: 'text-gray-700',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);