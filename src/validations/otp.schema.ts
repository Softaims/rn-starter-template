// src/validations/otp.schema.ts
import { z } from "zod";

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "OTP must contain only numbers"),
});

export type OTPFormData = z.infer<typeof otpSchema>;