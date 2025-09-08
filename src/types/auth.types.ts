// src/types/auth.types.ts
export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  needsVerification: boolean; // ✅ new flag

  // Actions
  initializeAuth: () => Promise<void>;
  signUp: (formData: SignUpFormData) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signInWithSocial: (
    provider: string,
    idToken: string,
    accessToken?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;

  // New password reset actions
  forgotPassword: (email: string) => Promise<AuthResponse>;
  resetPassword: (newPassword: string) => Promise<AuthResponse>;
  verifyOtp: (email: string, token: string) => Promise<AuthResponse>;

  clearError: () => void;
  setUser: (user: User | null) => void;
  setSession: (session: any) => void;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    userId: string;
    email: string;
  };
}

// Additional types for password reset flow
export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface OTPVerificationFormData {
  code: string;
}

// Type for auth state change events
export type AuthStateChangeEvent =
  | "SIGNED_IN"
  | "SIGNED_OUT"
  | "TOKEN_REFRESHED"
  | "USER_UPDATED"
  | "PASSWORD_RECOVERY";

// Type for auth error codes
export type AuthErrorCode =
  | "SIGNUP_EMAIL_EXISTS"
  | "INVALID_CREDENTIALS"
  | "NETWORK_ERROR"
  | "INVALID_OTP"
  | "OTP_EXPIRED"
  | "PASSWORD_TOO_WEAK"
  | "NO_SESSION"
  | "UNKNOWN_ERROR";

export interface AuthError {
  message: string;
  code: AuthErrorCode;
}

// Type for the auth store persistence
export interface AuthPersistedState {
  user: User | null;
  session: any | null;
  isAuthenticated: boolean;
}
