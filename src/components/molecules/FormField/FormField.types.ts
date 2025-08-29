import { Control, FieldError } from "react-hook-form";

export type FormFieldVariants =
  | "default"
  | "inline"
  | "floating"
  | "outlined"
  | "filled"
  | "underline"
  | "auth"
  | "compact"
  | "error"
  | "success"
  | "disabled";

export interface FormFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: FieldError;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: FormFieldVariants;
}
