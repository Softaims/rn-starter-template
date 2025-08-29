// dividerVariants.ts
import { cva } from 'class-variance-authority';

export const dividerVariants = cva(
  'flex items-center w-full', // base classes
  {
    variants: {
      orientation: {
        horizontal: 'flex-row my-6',
        vertical: 'flex-col h-full mx-4',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export const dividerLineVariants = cva('flex-1 bg-gray-300', {
  variants: {
    variant: {
      default: 'h-px',
      dashed: 'h-px border-dashed border-gray-300 border-t',
      dotted: 'h-px border-dotted border-gray-300 border-t',
    },
    color: {
      default: 'bg-gray-300 border-gray-300',
      primary: 'bg-blue-300 border-blue-300',
      secondary: 'bg-gray-500 border-gray-500',
    },
    size: {
      sm: 'h-px',
      md: 'h-0.5',
      lg: 'h-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    color: 'default',
    size: 'sm',
  },
});

export const dividerTextVariants = cva('px-4', {
  variants: {
    textColor: {
      default: 'text-gray-600',
      primary: 'text-blue-600',
      secondary: 'text-gray-800',
    },
    textSize: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    textColor: 'default',
    textSize: 'sm',
  },
});