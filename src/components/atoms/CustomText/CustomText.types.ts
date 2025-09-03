import { TextProps } from 'react-native';

export type TextVariant = 'default' | 'bold' | 'italic' | 'underline' | 'heading' | 'subtitle';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TextColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'neutral' | 'light';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export interface CustomTextProps extends TextProps {
  variant?: TextVariant; // Text style variant
  size?: TextSize; // Text size
  color?: TextColor; // Text color
  align?: TextAlign; // Text alignment
  className?: string; // Custom class for additional styling
  children: React.ReactNode; // Text content
}