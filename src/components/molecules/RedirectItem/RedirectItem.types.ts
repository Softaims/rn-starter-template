// RedirectItem.types.ts
import { VariantProps } from 'class-variance-authority';
import { redirectItemVariants } from './RedirectItem.variants';

export interface RedirectItemProps extends VariantProps<typeof redirectItemVariants> {
  message?: string;
  actionLabel? : string;
  onPress: () => void;
  className?: string;
}