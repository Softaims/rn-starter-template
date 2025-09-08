import React from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import TextInputField from "../../atoms/TextInputField/TextInputField";
import CustomText from "../../atoms/CustomText/CustomText";
import { FormFieldProps } from "./FormField.types";
import { formFieldVariants } from "./FormField.variants";
import clsx from "clsx";

const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = "none",
  error,
  leftIcon,
  rightIcon,
  variant = "default",
}) => {
  const variantClasses = formFieldVariants[variant];

  return (
    <View className={clsx("mb-4", variantClasses.container)}>
      {label && (
        <CustomText
          variant="default"
          size="md"
          color="primary"
          className={clsx("mb-2", variantClasses.label)}
        >
          {label}
        </CustomText>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputField
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            variant={error ? "outline" : "default"}
            error={!!error}
            fullWidth
            leftIcon={leftIcon}
            rightIcon={rightIcon}
          />
        )}
      />
      {error && (
        <CustomText
          variant="default"
          size="sm"
          color="error"
          className={clsx("mt-1 ml-1", variantClasses.error)}
        >
          {error.message}
        </CustomText>
      )}
    </View>
  );
};

export default FormField;