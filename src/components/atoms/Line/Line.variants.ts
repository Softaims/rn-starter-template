
import { cva, VariantProps } from 'class-variance-authority';

export const lineVariants = cva('w-full', {
  variants: {
    thickness: {
      thin: 'h-px',
      medium: 'h-1',
      thick: 'h-2',
    },
    color: {
      gray: 'bg-gray-300',
      primary: 'bg-blue-500',
      accent: 'bg-pink-500',
    },
  },
  defaultVariants: {
    thickness: 'thin',
    color: 'gray',
  },
});

export type LineVariantProps = VariantProps<typeof lineVariants>;
