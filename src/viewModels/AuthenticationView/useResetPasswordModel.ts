import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordFormData } from "../../validations/auth.schema";
import { useAuth } from "../../hooks/useAuth";

export const useResetPasswordViewModel = () => {
  const { resetPassword, isLoading, error, clearError } = useAuth();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: ResetPasswordFormData) => {
    clearError();
    try {
      return await resetPassword(data.password);
    } catch (error) {
      console.error("Reset password error:", error);
      // Error is already handled by the store
      return false;
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isLoading,
    error,
    clearError,
  };
};