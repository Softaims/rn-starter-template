// src/viewModels/useSignUpViewModel.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpFormData } from "../validations/auth.schema";
import { useAuth } from "../hooks/useAuth";

export const useSignUpViewModel = () => {
  const { signUp, isLoading, error, clearError } = useAuth();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: SignUpFormData) => {
    clearError();
    try {
      return await signUp(data);
    } catch (error) {
      // Error is already handled in the store
      console.error("Sign up error:", error);
      throw error;
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
