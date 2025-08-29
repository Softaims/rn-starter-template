// src/screens/OTPScreen.variants.ts
import { cva } from 'class-variance-authority';

export const otpScreenContainerVariants = cva(
  'bg-white flex-1',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);

export const otpScreenLogoVariants = cva(
  'items-center mb-8',
  {
    variants: {
      size: {
        sm: 'mb-4',
        md: 'mb-6',
        lg: 'mb-8',
        xl: 'mb-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const otpScreenHeaderVariants = cva(
  'mb-8',
  {
    variants: {
      alignment: {
        left: 'items-start text-left',
        center: 'items-center text-center',
        right: 'items-end text-right',
      },
    },
    defaultVariants: {
      alignment: 'center',
    },
  }
);