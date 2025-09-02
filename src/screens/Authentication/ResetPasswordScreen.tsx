// src/screens/ResetPasswordScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../../components/atoms/CustomText/CustomText';
import Button from '../../components/atoms/Buttons/Button';
import { FormField } from '../../components/molecules/FormField/FormField';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useResetPasswordViewModel } from '../../viewModels/AuthenticationView/useResetPasswordModel';

const ResetPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const { form, handleSubmit, isLoading, error } = useResetPasswordViewModel();
  const { control, formState: { errors } } = form;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View className="items-center mb-8">
          <CustomText variant="heading" size="2xl" color="primary" className="mb-2">
            Reset Password
          </CustomText>
          <CustomText variant="subtitle" size="lg" color="secondary" align="center">
            Create a new password for your account
          </CustomText>
        </View>

        {/* Form Section */}
        <View className="mb-6">
         
          <View className="space-y-4">
            <FormField
              control={control}
              name="password"
              label="New Password"
              placeholder="Enter your new password"
              secureTextEntry={!showPassword}
              error={errors.password}
              leftIcon={<Icon name="lock" size={20} color="#666" />}
              rightIcon={
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Icon
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              }
            />

            <FormField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your new password"
              secureTextEntry={!showConfirmPassword}
              error={errors.confirmPassword}
              leftIcon={<Icon name="lock" size={20} color="#666" />}
              rightIcon={
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                  <Icon
                    name={showConfirmPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              }
            />
          </View>

          {error && (
            <CustomText variant="default" size="sm" color="error" className="mt-2 text-center">
              {error}
            </CustomText>
          )}
        </View>

        {/* Submit Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          className="mb-6"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Reset Password
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;