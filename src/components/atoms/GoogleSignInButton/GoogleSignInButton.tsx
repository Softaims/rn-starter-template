// src/components/atoms/GoogleSignInButton/GoogleSignInButton.tsx
import React from "react";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
// import { GoogleSignInButtonProps } from "./GoogleSignInButton.types";
import { googleButtonVariants } from "./GoogleSignInButton.variant";
import clsx from "clsx";
import { StyleSheet } from "react-native";

const GoogleSignInButton: React.FC<any> = ({
  size = "wide",
  color = "dark",
  disabled,
  onPress,
  className,
}) => {
  return (
    <GoogleSigninButton
      style={StyleSheet.flatten([
        googleButtonVariants({ size, color }),
        disabled && styles.disabled,
      ])}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={onPress}
      disabled={disabled}
      className={clsx(className)}
    />
  );
};

const styles = StyleSheet.create({
  disabled: { opacity: 0.6 },
});

export default GoogleSignInButton;
