import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../validations/auth.schema";
import { useAuth } from "../../hooks/useAuth";

export const useLoginViewModel = () => {
  const { signIn, isLoading, error, clearError } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Core login logic
   */
  const submitLogin = async (data: LoginFormData) => {
    clearError();
    try {
      const { email, password } = data;
      console.log("Login attempt:", data);
      const result = await signIn(email, password);
      console.log("Login result:", result);
      return result;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(submitLogin), // for direct use in <form>
    loginDirect: submitLogin,                  // for manual use in screens
    isLoading,
    error,
    clearError,
  };
};
