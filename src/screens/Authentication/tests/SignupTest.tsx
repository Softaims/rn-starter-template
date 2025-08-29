// src/components/test/AuthArchitectureTest.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useAuthStore } from '../../../stores/supabaseAuth.store';
import { useSignUpViewModel } from '../../../viewModels/useSignUpViewModel';
import Button from '../../../components/atoms/Buttons/Button';
import CustomText from '../../../components/atoms/CustomText/CustomText';
import TextInputField from '../../../components/atoms/TextInputField';
import { mockAuthService, MOCK_SCENARIOS } from '../../../services/__mocks__/supabaseAuth.service'; // Import MOCK_SCENARIOS

  
const AuthArchitectureTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [currentTest, setCurrentTest] = useState<string>('');
  
  // Test different scenarios
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('password123');
  const [testUsername, setTestUsername] = useState('testuser');

  // Access store directly to monitor state changes
  const { user, isAuthenticated, isLoading, error, signIn, signOut, initializeAuth } = useAuthStore();
  const signUpViewModel = useSignUpViewModel();

  const addTestResult = (message: string, success: boolean = true) => {
    const timestamp = new Date().toLocaleTimeString();
    const status = success ? '✅' : '❌';
    setTestResults(prev => [`${timestamp} ${status} ${message}`, ...prev]);
  };

  const clearResults = () => {
    setTestResults([]);
    mockAuthService.reset();
  };

  // Test Scenarios
  const testSuccessfulSignUp = async () => {
    setCurrentTest('Testing Successful SignUp');
    mockAuthService.setScenario(MOCK_SCENARIOS.SUCCESS); // Use Godirectly from the source object
    
    try {
      // Simulate form data
      const formData = {
        username: testUsername,
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      };

      addTestResult('Starting signup process...');
      
      // Test the view model (which uses the store)
      const result = await signUpViewModel.form.handleSubmit(async (data) => {
        return await useAuthStore.getState().signUp(data);
      })();

      addTestResult('SignUp ViewModel executed successfully');
      addTestResult(`Store loading state: ${isLoading}`);
      addTestResult(`Store error state: ${error || 'null'}`);
      
    } catch (err: any) {
      addTestResult(`SignUp failed: ${err.message}`, false);
    }
    
    setCurrentTest('');
  };

  const testEmailExistsError = async () => {
    setCurrentTest('Testing Email Exists Error');
    mockAuthService.setScenario(MOCK_SCENARIOS.EMAIL_EXISTS); // Use MOCK_SCENARIOS.EMAIL_EXISTS
    
    try {
      await useAuthStore.getState().signUp({
        username: testUsername,
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      });
      
      addTestResult('Should have thrown error', false);
    } catch (err: any) {
      addTestResult(`Correctly caught error: ${err.message}`);
      addTestResult(`Store error state: ${error}`);
    }
    
    setCurrentTest('');
  };

  const testNetworkError = async () => {
    setCurrentTest('Testing Network Error');
    mockAuthService.setScenario(MOCK_SCENARIOS.NETWORK_ERROR); // Use MOCK_SCENARIOS.NETWORK_ERROR
    
    try {
      await useAuthStore.getState().signUp({
        username: testUsername,
        email: testEmail,  
        password: testPassword,
        confirmPassword: testPassword,
      });
      
      addTestResult('Should have thrown error', false);
    } catch (err: any) {
      addTestResult(`Correctly handled network error: ${err.message}`);
    }
    
    setCurrentTest('');
  };

  const testSignInFlow = async () => {
    setCurrentTest('Testing SignIn Flow');
    mockAuthService.setScenario(MOCK_SCENARIOS.SUCCESS); // Use MOCK_SCENARIOS.SUCCESS
    
    try {
      // First create a user
      await mockAuthService.signUp({
        username: testUsername,
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      });
      
      addTestResult('Test user created for signin');
      
      // Now test signin
      await signIn(testEmail, testPassword);
      
      addTestResult('SignIn completed');
      addTestResult(`Authenticated: ${isAuthenticated}`);
      addTestResult(`User: ${user?.email || 'null'}`);
      
    } catch (err: any) {
      addTestResult(`SignIn failed: ${err.message}`, false);
    }
    
    setCurrentTest('');
  };

  const testSignOutFlow = async () => {
    setCurrentTest('Testing SignOut Flow');
    
    try {
      await signOut();
      
      addTestResult('SignOut completed');
      addTestResult(`Authenticated: ${isAuthenticated}`);
      addTestResult(`User: ${user?.email || 'null'}`);
      
    } catch (err: any) {
      addTestResult(`SignOut failed: ${err.message}`, false);
    }
    
    setCurrentTest('');
  };

  const testFormValidation = () => {
    setCurrentTest('Testing Form Validation');
    
    // Test empty form submission
    signUpViewModel.form.handleSubmit(() => {})();
    
    const errors = signUpViewModel.form.formState.errors;
    
    addTestResult(`Username error: ${errors.username?.message || 'none'}`);
    addTestResult(`Email error: ${errors.email?.message || 'none'}`);
    addTestResult(`Password error: ${errors.password?.message || 'none'}`);
    addTestResult(`Form validation working: ${Object.keys(errors).length > 0}`);
    
    setCurrentTest('');
  };

  const inspectCurrentState = () => {
    addTestResult('=== CURRENT STATE INSPECTION ===');
    addTestResult(`Store - isLoading: ${isLoading}`);
    addTestResult(`Store - isAuthenticated: ${isAuthenticated}`);
    addTestResult(`Store - user: ${user ? JSON.stringify(user) : 'null'}`);
    addTestResult(`Store - error: ${error || 'null'}`);
    addTestResult(`ViewModel - isLoading: ${signUpViewModel.isLoading}`);
    addTestResult(`ViewModel - error: ${signUpViewModel.error || 'null'}`);
    addTestResult(`Mock Users: ${mockAuthService.getCurrentUsers().length}`);
    addTestResult(`Mock Session: ${mockAuthService.getCurrentSession() ? 'Active' : 'None'}`);
  };

  useEffect(() => {
    // Initialize auth state
    initializeAuth();
    addTestResult('Auth architecture test initialized');
  }, []);

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <CustomText variant="heading" size="xl" className="mb-4 text-center">
        🧪 Auth Architecture Test
      </CustomText>
      
      {/* Test Controls */}
      <View className="mb-6 p-4 bg-gray-50 rounded-lg">
        <CustomText variant="subtitle" className="mb-3">Test Data:</CustomText>
        <TextInputField
          label="Email"
          value={testEmail}
          onChangeText={setTestEmail}
          className="mb-2"
        />
        <TextInputField
          label="Username"
          value={testUsername}
          onChangeText={setTestUsername}
          className="mb-2"
        />
        <TextInputField
          label="Password"
          value={testPassword}
          onChangeText={setTestPassword}
          secureTextEntry
        />
      </View>

      {/* Test Buttons */}
      <View className="space-y-2 mb-6">
        <Button
          variant="primary"
          onPress={testSuccessfulSignUp}
          disabled={!!currentTest}
        >
          Test Successful SignUp
        </Button>
        
        <Button
          variant="secondary"
          onPress={testEmailExistsError}
          disabled={!!currentTest}
        >
          Test Email Exists Error
        </Button>
        
        <Button
          variant="secondary"
          onPress={testNetworkError}
          disabled={!!currentTest}
        >
          Test Network Error
        </Button>
        
        <Button
          variant="outline"
          onPress={testSignInFlow}
          disabled={!!currentTest}
        >
          Test SignIn Flow
        </Button>
        
        <Button
          variant="outline"
          onPress={testSignOutFlow}
          disabled={!!currentTest}
        >
          Test SignOut Flow
        </Button>
        
        <Button
          variant="outline"
          onPress={testFormValidation}
          disabled={!!currentTest}
        >
          Test Form Validation
        </Button>
        
        <Button
          variant="outline"
          onPress={inspectCurrentState}
          disabled={!!currentTest}
        >
          Inspect Current State
        </Button>
        
        <Button
          variant="outline"
          onPress={clearResults}
          disabled={!!currentTest}
        >
          Clear Results
        </Button>
      </View>

      {/* Current Test Status */}
      {currentTest && (
        <View className="mb-4 p-3 bg-blue-50 rounded-lg">
          <CustomText color="primary">🔄 {currentTest}...</CustomText>
        </View>
      )}

      {/* Test Results */}
      <View className="bg-black rounded-lg p-4">
        <CustomText variant="subtitle" color="primary" className="mb-2">
          Test Results ({testResults.length})
        </CustomText>
        <ScrollView style={{ maxHeight: 300 }}>
          {testResults.map((result, index) => (
            <CustomText 
              key={index}
              size="sm"
              color="primary"
              className="font-mono mb-1"
            >
              {result}
            </CustomText>
          ))}
          {testResults.length === 0 && (
            <CustomText color="neutral" size="sm">
              No test results yet. Run some tests!
            </CustomText>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default AuthArchitectureTest;