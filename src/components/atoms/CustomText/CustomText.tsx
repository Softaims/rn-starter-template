import React from 'react';
import { Text, View } from 'react-native';
import { CustomTextProps } from './CustomText.types';
import { textVariants } from './CustomText.variants';

// Custom Text component
const CustomText: React.FC<CustomTextProps> = ({
  variant = 'default',
  size = 'md',
  color = 'neutral',
  align = 'left',
  className,
  style,
  children,
  ...props
}) => {
  return (
      <Text
        className={textVariants({ variant, size, color, align, className })}
        style={style}
        {...props}
      >
        {children}
      </Text>
  );
};

export default CustomText;