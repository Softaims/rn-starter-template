import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OTPFormData } from "../../validations/otp.schema";
import { useAuth } from "../../hooks/useAuth";

export const useOTPViewModel = (email: string) => {
  const { verifyOtp, forgotPassword, isLoading, error, clearError } = useAuth();

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  /**
   * Internal submit logic
   */
  const submitOtp = async (data: OTPFormData) => {
    clearError();
    try {
      console.log("Submitting OTP for email:", email, "with data:", data);
      const result = await verifyOtp(email, data.otp);
      console.log("OTP verification result:", result);
      return result;
    } catch (err) {
      console.error("OTP verification error:", err, email, data);
      // Error is already handled by the store
      return false;
    }
  };

  /**
   * Resend OTP handler
   */
  const handleResend = async () => {
    clearError();
    try {
      await forgotPassword(email);
      console.log("OTP resent successfully");
      return true;
    } catch (err) {
      console.error("Resend OTP error:", err);
      // Error is already handled by the store
      return false;
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(submitOtp),
    verifyOtpDirect: submitOtp,            
    handleResend,
    isLoading,
    error,
    clearError,
  };
};