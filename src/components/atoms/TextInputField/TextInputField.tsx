// TextInputField.tsx
import React from 'react';
import { TextInput, View } from 'react-native';
import CustomText from '../CustomText/CustomText';
import { textFieldVariants, textInputVariants, labelVariants } from './TextInputField.variants';
import { TextFieldProps } from './TextInputField.types';

const TextInputField: React.FC<TextFieldProps> = ({
  variant = 'default',
  size = 'md',
  fullWidth = false,
  error = false,
  leftIcon,
  rightIcon,
  label,
  className,
  style,
  ...props
}) => {
  const containerClasses = textFieldVariants({ variant, size, fullWidth, error, className });
  const inputClasses = textInputVariants({ variant, size, error });
  const labelClasses = labelVariants({ size, error });

  return (
    <View className={fullWidth ? 'w-full' : 'w-auto'}>
      {label && (
        <CustomText variant="default" className={labelClasses}>
          {label}
        </CustomText>
      )}
      <View className={containerClasses}>
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        <TextInput
          className={inputClasses}
          style={style}
          placeholderTextColor={error ? '#EF4444' : '#6B7280'}
          {...props}
        />
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>
    </View>
  );
};

export default TextInputField;