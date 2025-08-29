// src/components/atoms/Button/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { buttonVariants } from './Button.variant';
import { ButtonProps } from './Button.types';
import clsx from 'clsx';

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  fullWidth,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={clsx(
        buttonVariants({ variant, size, fullWidth }),
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <ActivityIndicator size="small" className="mr-2" />}
      {leftIcon && !loading && <View className="mr-2">{leftIcon}</View>}
      <Text>{children}</Text>
      {rightIcon && <View className="ml-2">{rightIcon}</View>}
    </TouchableOpacity>
  );
};

export default Button;