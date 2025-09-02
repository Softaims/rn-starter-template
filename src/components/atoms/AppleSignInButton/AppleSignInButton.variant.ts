// src/components/atoms/AppleSignInButton/AppleSignInButton.variant.ts
import { cva } from "class-variance-authority";

export const appleButtonVariants = cva(
  // base styles
  "overflow-hidden rounded-lg",
  {
    variants: {
      size: {
        sm: "w-[160px] h-[40px]",
        md: "w-[200px] h-[44px]",
        lg: "w-[240px] h-[50px]",
      },
      fullWidth: {
        true: "w-full h-[44px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);