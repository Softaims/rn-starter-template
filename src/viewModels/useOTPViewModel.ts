// src/viewModels/useOTPViewModel.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OTPFormData } from "../validations/otp.schema";
import { useAuth } from "../hooks/useAuth";

export const useOTPViewModel = (email: string) => {
  const { verifyOtp, forgotPassword, isLoading, error, clearError } = useAuth();

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmit = async (data: OTPFormData) => {
    clearError();
    try {
      return await verifyOtp(email, data.otp);
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  };

  const handleResend = async () => {
    clearError();
    try {
      await forgotPassword(email);
      console.log("OTP resent successfully");
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw error;
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    handleResend,
    isLoading,
    error,
    clearError,
  };
};