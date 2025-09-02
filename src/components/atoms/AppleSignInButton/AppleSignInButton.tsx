import React from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { AppleSignInButtonProps } from "./AppleSignInButton.types";
import { StyleSheet } from "react-native";

// helper: map cva variants into RN styles
const variantStyles = {
  sm: { width: 160, height: 40 },
  md: { width: 200, height: 44 },
  lg: { width: 240, height: 50 },
  fullWidth: { width: StyleSheet.hairlineWidth * 1000, height: 44 }, 
};

const AppleSignInButton: React.FC<AppleSignInButtonProps> = ({
  size = "md",
  fullWidth = false,
  onPress,
}) => {
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={8}
      style={[
        styles.base,
        variantStyles[size],
        fullWidth && variantStyles.fullWidth,
      ]}
      onPress={onPress}
    />
  );
};

export default AppleSignInButton;

const styles = StyleSheet.create({
  base: { overflow: "hidden", borderRadius: 8 },
});
