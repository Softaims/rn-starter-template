// TextInputField.types.ts
import { TextInputProps } from 'react-native';
import { VariantProps } from 'class-variance-authority';
import { textFieldVariants, textInputVariants, labelVariants } from './TextInputField.variants';

export type TextFieldVariant = 'default' | 'outline' | 'underline' | 'filled';
export type TextFieldSize = 'sm' | 'md' | 'lg';

export interface TextFieldProps 
  extends TextInputProps,
    VariantProps<typeof textFieldVariants>,
    VariantProps<typeof textInputVariants>,
    VariantProps<typeof labelVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  className?: string;
}