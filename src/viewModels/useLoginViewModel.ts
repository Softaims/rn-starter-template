import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../validations/auth.schema";

import { useAuth } from "../hooks/useAuth";

export const useLoginViewModel = () => {
  const { signIn, isLoading, error, clearError } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    console.log("data",data)
    const {email , password } = data

    clearError();
    try {
      return await signIn(email,password);
    } catch (error) {
      console.error("Login error:", error);
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