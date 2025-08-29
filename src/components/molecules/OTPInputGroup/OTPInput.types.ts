// src/components/molecules/OTPInput/OTPInput.types.ts
import { Control, FieldError } from "react-hook-form";

export interface OTPInputProps {
  control: Control<any>;
  name: string;
  length?: number;
  error?: FieldError;
  onResend?: () => void; // Callback for resend OTP action
  email?: string; // Email to display in instruction text
}