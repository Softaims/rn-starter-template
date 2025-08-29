// src/services/auth.service.ts
import { supabase } from '../../lib/supabaseClient';
import { SignUpFormData, AuthResponse } from '../types/auth.types';

export const authService = {
  signUp: async (formData: SignUpFormData): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
        },
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        data: {
          userId: data.user?.id || '',
          email: data.user?.email || '',
        },
      };
    } catch (error) {
      console.error('Sign up error:', error);
      throw {
        message: error.message || 'An error occurred during sign up',
        code: error.code || 'SIGN_UP_ERROR',
      };
    }
  },

  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        data: {
          userId: data.user?.id || '',
          email: data.user?.email || '',
        },
      };
    } catch (error) {
      console.error('Sign in error:', error);
      throw {
        message: error.message || 'An error occurred during sign in',
        code: error.code || 'SIGN_IN_ERROR',
      };
    }
  },

  signOut: async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Sign out error:', error);
      throw {
        message: error.message || 'An error occurred during sign out',
        code: error.code || 'SIGN_OUT_ERROR',
      };
    }
  },

   forgotPassword: async (email: string): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'nourishwise://reset-password', // Deep link for your app
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: 'Password reset email sent successfully',
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      throw {
        message: error.message || 'An error occurred while sending reset email',
        code: error.code || 'FORGOT_PASSWORD_ERROR',
      };
    }
  },

  resetPassword: async (newPassword: string): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: 'Password reset successfully',
      };
    } catch (error) {
      console.error('Reset password error:', error);
      throw {
        message: error.message || 'An error occurred while resetting password',
        code: error.code || 'RESET_PASSWORD_ERROR',
      };
    }
  },

  verifyOtp: async (email: string, token: string): Promise<AuthResponse> => {
    try {
      // This is a simplified implementation
      // In a real app, you might use Supabase's OTP verification
      // or implement your own OTP system
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'recovery',
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        data: {
          userId: data.user?.id || '',
          email: data.user?.email || '',
        },
      };
    } catch (error) {
      console.error('OTP verification error:', error);
      throw {
        message: error.message || 'An error occurred during OTP verification',
        code: error.code || 'OTP_VERIFICATION_ERROR',
      };
    }
  },

  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      return data.session;
    } catch (error) {
      console.error('Get session error:', error);
      throw error;
    }
  },

  onAuthStateChange: (callback: (event: any, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};