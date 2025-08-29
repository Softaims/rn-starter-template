// src/viewModels/useForgotPasswordViewModel.ts
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordFormData } from "../validations/auth.schema";
import { useAuth } from "../hooks/useAuth";

export const useForgotPasswordViewModel = () => {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    clearError();
    setIsSuccess(false);
    
    try {
      // For now, simulate success for any valid email
      // This will be replaced with actual API call later
      const isValidEmail = await forgotPassword(data.email);
      
      if (isValidEmail) {
        setIsSuccess(true);
        return { success: true, email: data.email };
      }
      
      return { success: false, email: data.email };
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isLoading,
    error,
    clearError,
    isSuccess
  };
};