// // src/services/__mocks__/supabaseAuth.service.ts
// import { SignUpFormData, AuthResponse } from '../../types/auth.types';

// // Mock user database (in-memory for testing)
// const mockUsers: Array<{ id: string; email: string; password: string; username: string; resetToken?: string }> = [];
// let mockSession: any = null;
// let authStateChangeCallback: ((event: string, session: any) => void) | null = null;

// // Simulate network delay
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// // Define scenarios as a const assertion
// export const MOCK_SCENARIOS = {
//   SUCCESS: "success",
//   EMAIL_EXISTS: "email_exists",
//   NETWORK_ERROR: "network_error",
//   INVALID_CREDENTIALS: "invalid_credentials",
//   INVALID_OTP: "invalid_otp",
//   PASSWORD_TOO_WEAK: "password_too_weak",
// } as const;

// // Extract the union type of MOCK_SCENARIOS values
// type MockScenario = typeof MOCK_SCENARIOS[keyof typeof MOCK_SCENARIOS];

// // Initialize currentScenario with one of the valid values
// let currentScenario: MockScenario = MOCK_SCENARIOS.SUCCESS;

// // Store reset tokens for testing
// const mockResetTokens = new Map<string, { token: string; expiresAt: number }>();

// export const mockAuthService = {
//   // Method to control test scenarios
//   setScenario: (scenario: MockScenario) => {
//     currentScenario = scenario;
//   },

//   // Reset mock state
//   reset: () => {
//     mockUsers.length = 0;
//     mockSession = null;
//     mockResetTokens.clear();
//     currentScenario = MOCK_SCENARIOS.SUCCESS;
//   },

//   signUp: async (formData: SignUpFormData): Promise<AuthResponse> => {
//     console.log('🔧 Mock SignUp called with:', { ...formData, password: '[HIDDEN]' });
    
//     await delay(1000);

//     switch (currentScenario) {
//       case MOCK_SCENARIOS.EMAIL_EXISTS:
//         throw {
//           message: 'User already registered',
//           code: 'SIGNUP_EMAIL_EXISTS',
//         };

//       case MOCK_SCENARIOS.NETWORK_ERROR:
//         throw {
//           message: 'Network error occurred',
//           code: 'NETWORK_ERROR',
//         };

//       case MOCK_SCENARIOS.SUCCESS:
//       default:
//         const existingUser = mockUsers.find(user => user.email === formData.email);
//         if (existingUser) {
//           throw {
//             message: 'User already registered',
//             code: 'SIGNUP_EMAIL_EXISTS',
//           };
//         }

//         const newUser = {
//           id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//           email: formData.email,
//           password: formData.password,
//           username: formData.username,
//         };

//         mockUsers.push(newUser);
//         console.log('✅ Mock user created:', { ...newUser, password: '[HIDDEN]' });

//         return {
//           success: true,
//           data: {
//             userId: newUser.id,
//             email: newUser.email,
//           },
//         };
//     }
//   },

//   signIn: async (email: string, password: string): Promise<AuthResponse> => {
//     console.log('🔧 Mock SignIn called with:', { email, password: '[HIDDEN]' });
    
//     await delay(800);

//     switch (currentScenario) {
//       case MOCK_SCENARIOS.INVALID_CREDENTIALS:
//         throw {
//           message: 'Invalid login credentials',
//           code: 'INVALID_CREDENTIALS',
//         };

//       case MOCK_SCENARIOS.NETWORK_ERROR:
//         throw {
//           message: 'Network error occurred',
//           code: 'NETWORK_ERROR',
//         };

//       case MOCK_SCENARIOS.SUCCESS:
//       default:
//         const user = mockUsers.find(u => u.email === email && u.password === password);
        
//         if (!user) {
//           throw {
//             message: 'Invalid login credentials',
//             code: 'INVALID_CREDENTIALS',
//           };
//         }

//         mockSession = {
//           user: {
//             id: user.id,
//             email: user.email,
//             user_metadata: {
//               username: user.username,
//             },
//           },
//           access_token: `mock_token_${user.id}`,
//           expires_at: Date.now() + (60 * 60 * 1000), // 1 hour
//         };

//         if (authStateChangeCallback) {
//           setTimeout(() => {
//             authStateChangeCallback?.('SIGNED_IN', mockSession);
//           }, 100);
//         }

//         console.log('✅ Mock sign in successful:', { userId: user.id, email: user.email });

//         return {
//           success: true,
//           data: {
//             userId: user.id,
//             email: user.email,
//           },
//         };
//     }
//   },

//   signOut: async (): Promise<void> => {
//     console.log('🔧 Mock SignOut called');
    
//     await delay(500);

//     mockSession = null;
    
//     if (authStateChangeCallback) {
//       setTimeout(() => {
//         authStateChangeCallback?.('SIGNED_OUT', null);
//       }, 100);
//     }

//     console.log('✅ Mock sign out successful');
//   },

//   getSession: async () => {
//     console.log('🔧 Mock GetSession called');
//     await delay(200);
    
//     console.log('✅ Mock session retrieved:', mockSession ? 'Active session' : 'No session');
//     return mockSession;
//   },

//   onAuthStateChange: (callback: (event: string, session: any) => void) => {
//     console.log('🔧 Mock onAuthStateChange listener registered');
//     authStateChangeCallback = callback;
    
//     return {
//       data: {
//         subscription: {
//           unsubscribe: () => {
//             console.log('🔧 Mock auth state change listener unsubscribed');
//             authStateChangeCallback = null;
//           },
//         },
//       },
//     };
//   },

//   // New password reset methods
//   forgotPassword: async (email: string): Promise<AuthResponse> => {
//     console.log('🔧 Mock ForgotPassword called with:', { email });
    
//     await delay(800);

//     switch (currentScenario) {
//       case MOCK_SCENARIOS.NETWORK_ERROR:
//         throw {
//           message: 'Network error occurred',
//           code: 'NETWORK_ERROR',
//         };

//       case MOCK_SCENARIOS.SUCCESS:
//       default:
//         const user = mockUsers.find(u => u.email === email);
        
//         if (!user) {
//           // For security reasons, we don't reveal if the email exists
//           console.log('📧 Mock password reset email "sent" (email not found but pretending it was sent)');
//           return {
//             success: true,
//             message: 'Password reset email sent successfully',
//           };
//         }

//         // Generate a mock reset token (123456 for testing)
//         const resetToken = '123456';
//         const expiresAt = Date.now() + (15 * 60 * 1000); // 15 minutes
        
//         mockResetTokens.set(email, { token: resetToken, expiresAt });
//         console.log('📧 Mock password reset email sent with token:', resetToken);

//         return {
//           success: true,
//           message: 'Password reset email sent successfully',
//         };
//     }
//   },

//   resetPassword: async (newPassword: string): Promise<AuthResponse> => {
//     console.log('🔧 Mock ResetPassword called');
    
//     await delay(800);

//     switch (currentScenario) {
//       case MOCK_SCENARIOS.NETWORK_ERROR:
//         throw {
//           message: 'Network error occurred',
//           code: 'NETWORK_ERROR',
//         };

//       case MOCK_SCENARIOS.PASSWORD_TOO_WEAK:
//         throw {
//           message: 'Password should be at least 6 characters',
//           code: 'PASSWORD_TOO_WEAK',
//         };

//       case MOCK_SCENARIOS.SUCCESS:
//       default:
//         if (!mockSession || !mockSession.user) {
//           throw {
//             message: 'No active session found',
//             code: 'NO_SESSION',
//           };
//         }

//         if (newPassword.length < 6) {
//           throw {
//             message: 'Password should be at least 6 characters',
//             code: 'PASSWORD_TOO_WEAK',
//           };
//         }

//         const user = mockUsers.find(u => u.id === mockSession.user.id);
//         if (user) {
//           user.password = newPassword;
//           console.log('✅ Mock password reset successful for user:', user.email);
//         }

//         return {
//           success: true,
//           message: 'Password reset successfully',
//         };
//     }
//   },

//   verifyOtp: async (email: string, token: string): Promise<AuthResponse> => {
//     console.log('🔧 Mock VerifyOtp called with:', { email, token });
    
//     await delay(800);

//     switch (currentScenario) {
//       case MOCK_SCENARIOS.NETWORK_ERROR:
//         throw {
//           message: 'Network error occurred',
//           code: 'NETWORK_ERROR',
//         };

//       case MOCK_SCENARIOS.INVALID_OTP:
//         throw {
//           message: 'Invalid verification code',
//           code: 'INVALID_OTP',
//         };

//       case MOCK_SCENARIOS.SUCCESS:
//       default:
//         const resetData = mockResetTokens.get(email);
        
//         if (!resetData || resetData.token !== token) {
//           throw {
//             message: 'Invalid verification code',
//             code: 'INVALID_OTP',
//           };
//         }

//         if (Date.now() > resetData.expiresAt) {
//           throw {
//             message: 'Verification code has expired',
//             code: 'OTP_EXPIRED',
//           };
//         }

//         // Create a mock session for the user
//         const user = mockUsers.find(u => u.email === email);
//         if (user) {
//           mockSession = {
//             user: {
//               id: user.id,
//               email: user.email,
//               user_metadata: {
//                 username: user.username,
//               },
//             },
//             access_token: `mock_reset_token_${user.id}`,
//             expires_at: Date.now() + (15 * 60 * 1000), // 15 minutes for reset session
//           };

//           if (authStateChangeCallback) {
//             setTimeout(() => {
//               authStateChangeCallback?.('SIGNED_IN', mockSession);
//             }, 100);
//           }
//         }

//         console.log('✅ Mock OTP verification successful for:', email);

//         return {
//           success: true,
//           data: {
//             userId: user?.id || '',
//             email: user?.email || email,
//           },
//         };
//     }
//   },

//   // Helper methods for testing
//   getCurrentUsers: () => mockUsers,
//   getCurrentSession: () => mockSession,
//   getResetTokens: () => mockResetTokens,
  
//   // Test helper to manually set a reset token
//   setResetToken: (email: string, token: string, expiresInMinutes: number = 15) => {
//     const expiresAt = Date.now() + (expiresInMinutes * 60 * 1000);
//     mockResetTokens.set(email, { token, expiresAt });
//     console.log(`🔧 Manually set reset token for ${email}: ${token}, expires in ${expiresInMinutes} minutes`);
//   },
  
//   // Test helper to manually create a user
//   createTestUser: (email: string, password: string, username: string = 'testuser') => {
//     const existingUser = mockUsers.find(user => user.email === email);
//     if (existingUser) {
//       console.log('⚠️ User already exists:', email);
//       return existingUser;
//     }

//     const newUser = {
//       id: `test_user_${Date.now()}`,
//       email,
//       password,
//       username,
//     };

//     mockUsers.push(newUser);
//     console.log('✅ Test user created:', { ...newUser, password: '[HIDDEN]' });
//     return newUser;
//   },
  
//   // Test helper to clear all reset tokens
//   clearResetTokens: () => {
//     mockResetTokens.clear();
//     console.log('✅ All reset tokens cleared');
//   },
// };

// export const authService = mockAuthService;