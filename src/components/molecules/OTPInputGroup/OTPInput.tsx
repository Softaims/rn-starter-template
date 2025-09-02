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
    // Add a small delay to ensure proper focus
    setTimeout(() => {
      inputRefs.current[index]?.current?.focus();
    }, 10);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const digits = value ? value.split("") : Array(length).fill("");

        const handleChange = (text: string, index: number) => {
          // Handle paste - check if text contains multiple digits
          if (text.length > 1) {
            // Extract only digits from pasted text
            const pastedDigits = text.replace(/\D/g, '').split('').slice(0, length);
            const newDigits = Array(length).fill('');
            
            // Fill digits starting from the current index or from 0 if pasting
            pastedDigits.forEach((char, i) => {
              if (i < length) {
                newDigits[i] = char;
              }
            });
            
            onChange(newDigits.join(""));
            
            // Focus on the last filled input or the last input if all are filled
            const lastFilledIndex = Math.min(pastedDigits.length - 1, length - 1);
            focusInput(lastFilledIndex);
            return;
          }

          // Handle single character input
          if (!/^\d?$/.test(text)) return;

          const newDigits = [...digits];
          newDigits[index] = text;
          onChange(newDigits.join(""));

          // Auto-move to next field if character was entered and not at last field
          if (text && index < length - 1) {
            focusInput(index + 1);
          }
        };

        const handleKeyPress = (e: any, index: number) => {
          if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
            // Clear previous field and move focus there
            const newDigits = [...digits];
            newDigits[index - 1] = "";
            onChange(newDigits.join(""));
            focusInput(index - 1);
          }
        };

        const handleFocus = (index: number) => {
          setFocusedIndex(index);
          // Select all text when focusing (for better UX)
          setTimeout(() => {
            inputRefs.current[index]?.current?.setSelection(0, 1);
          }, 10);
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
                  onFocus={() => handleFocus(index)}
                  onBlur={() => setFocusedIndex(null)}
                  keyboardType="number-pad"
                  maxLength={length} // Allow longer input for paste handling
                  textAlign="center"
                  autoCapitalize="none"
                  autoCorrect={false}
                  selectTextOnFocus={true} // Better UX for editing
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
            <TouchableOpacity onPress={onResend}>
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