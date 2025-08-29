// Divider.types.ts
import { VariantProps } from 'class-variance-authority';
import { dividerVariants, dividerLineVariants, dividerTextVariants } from './Divider.variants';

export interface DividerProps
  extends VariantProps<typeof dividerVariants>,
    VariantProps<typeof dividerLineVariants>,
    VariantProps<typeof dividerTextVariants> {
  text?: string;
}