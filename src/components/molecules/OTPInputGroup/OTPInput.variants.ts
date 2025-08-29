// src/components/molecules/OTPInput/OTPInput.variants.ts
import { cva } from "class-variance-authority";

export const otpInputVariants = cva(
  "w-12 h-12 border rounded-md text-center text-xl font-bold bg-white",
  {
    variants: {
      defaultAlignment: {
        common: "flex-row justify-center space-x-4 mb-4",
      },
      focused: {
        true: "border-blue-600 border-2 shadow-md",
        false: "border-gray-300",
      },
      error: {
        true: "border-red-600",
        false: "",
      },
    },
    defaultVariants: {
      focused: false,
      error: false,
    },
  }
);
