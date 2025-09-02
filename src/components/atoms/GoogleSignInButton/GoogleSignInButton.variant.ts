import { cva } from "class-variance-authority";

export const googleButtonVariants = cva(
  "rounded-md flex items-center justify-center",
  {
    variants: {
      size: {
        wide: "w-[230px] h-[48px]",
        icon: "w-[48px] h-[48px]",
      },
      color: {
        dark: "bg-black",
        light: "bg-white border border-gray-300",
      },
    },
    defaultVariants: {
      size: "wide",
      color: "dark",
    },
  }
);
