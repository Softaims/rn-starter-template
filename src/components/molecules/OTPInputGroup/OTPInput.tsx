// src/components/molecules/OTPInput/OTPInput.tsx
import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Controller, FieldError } from "react-hook-form";
import CustomText from "../../atoms/CustomText/CustomText";
import { otpInputVariants } from "./OTPInput.variants";
import { OTPInputProps } from "./OTPInput.types";

const OTPInput: React.FC<OTPInputProps> = ({
  control,
  name,
  length = 6,
  error,
  onResend,
  email,
}) => {
  const inputRefs = useRef<Array<React.RefObject<TextInput>>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    inputRefs.current = Array.from({ length }, () => React.createRef<TextInput>());
  }, [length]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.current?.focus();
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const digits = value ? value.split("") : Array(length).fill("");

        const handleChange = (text: string, index: number) => {
          if (text.length > 1) {
            // Handle paste
            const pastedDigits = text.split("").slice(0, length);
            const newDigits = [...digits];
            pastedDigits.forEach((char, i) => {
              if (index + i < length && /^\d$/.test(char)) {
                newDigits[index + i] = char;
              }
            });
            onChange(newDigits.join(""));
            const nextIndex = Math.min(index + pastedDigits.length, length - 1);
            focusInput(nextIndex);
            return;
          }

          if (!/^\d?$/.test(text)) return;

          const newDigits = [...digits];
          newDigits[index] = text;
          onChange(newDigits.join(""));

          if (text && index < length - 1) {
            focusInput(index + 1);
          }
        };

        const handleKeyPress = (e: any, index: number) => {
          if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
            focusInput(index - 1);
          }
        };

        return (
          <View>
            {/* Heading molecule component should be here */}
            <CustomText variant="heading" size="2xl" className="mb-4 text-center">
              Verify Your Email
            </CustomText>
            {/* Instruction */}
            <CustomText
              variant="default"
              color="secondary"
              align="center"
              className="mb-8"
            >
              Enter the 6-digit code sent to {email || "your email"}.
            </CustomText>
            {/* OTP Input Fields */}
            <View className="flex-row justify-center space-x-4 mb-4">
              {Array.from({ length }).map((_, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs.current[index]}
                  className={otpInputVariants({
                    focused: focusedIndex === index,
                    error: !!error,
                  })}
                  value={digits[index]}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              ))}
            </View>
            {/* Error Message */}
            {error && (
              <CustomText
                variant="default"
                size="sm"
                color="error"
                className="mt-1 text-center"
              >
                {error.message}
              </CustomText>
            )}
            {/* Resend OTP */}
            <TouchableOpacity onPress={onResend} >
              <CustomText
                variant="default"
                size="sm"
                color="primary"
                align="right"
              >
                Resend OTP
              </CustomText>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

export { OTPInput };