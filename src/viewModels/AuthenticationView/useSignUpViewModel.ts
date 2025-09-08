// src/viewModels/useSignUpViewModel.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpFormData } from "../../validations/auth.schema";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useRouter } from "expo-router"; // Import useRouter

export const useSignUpViewModel = () => {
  const router = useRouter(); // Initialize router
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
    console.log("handleSubmit called with data:", data);
    
    clearError();
    setIsSuccess(false);
    
    try {
      // Set userEmail immediately with the form data
      setUserEmail(data.email);
      console.log("Set userEmail to:", data.email);
      
      const returnedData = await signUp(data);
      console.log("signUp returned:", returnedData);
      
      if (returnedData.success) {
        setIsSuccess(true);
        console.log("Sign up successful, isSuccess set to true");
        // Navigate to OTP screen with email
        router.push(`/(otp)/otp?email=${encodeURIComponent(data.email)}`);
        return true;
      } else {
        setIsSuccess(false);
        console.log("Sign up failed, isSuccess set to false");
        return false;
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setIsSuccess(false);
      setUserEmail(""); // Clear email on error
      return false;
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(handleSubmit),
    handleSubmit,
    isLoading,
    error,
    clearError,
    isSuccess,
    userEmail,
  };
};