// src/viewModels/useSignUpViewModel.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpFormData } from "../../validations/auth.schema";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react"; // Add this import

export const useSignUpViewModel = () => {
  const { signUp, isLoading, error, clearError } = useAuth();
   const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState(""); 

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
    setIsSuccess(false); // Reset success state
    try {
      const returnedData = await signUp(data);
       setIsSuccess(returnedData.success);
      setUserEmail(data.email);
      return returnedData.success;
    } catch (error) {
      console.error("Sign up error:", error);
      setIsSuccess(false);
      throw error;
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isLoading,
    error,
    clearError,
     isSuccess,
    userEmail, 
  };
};