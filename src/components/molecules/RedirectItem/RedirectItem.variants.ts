import { cva } from 'class-variance-authority';

export const redirectItemVariants = cva(
  'flex-row items-center',
  {
    variants: {
      align: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between',
      },
      spacing: {
        sm: 'space-x-1',
        md: 'space-x-2',
        lg: 'space-x-3',
        xl: 'space-x-4',
      },
    },
    defaultVariants: {
      align: 'center',
      spacing: 'md',
    },
  }
);