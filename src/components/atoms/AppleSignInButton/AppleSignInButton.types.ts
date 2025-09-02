// src/components/atoms/AppleSignInButton/AppleSignInButton.types.ts
import { ViewProps } from "react-native";

export type AppleButtonSize = "sm" | "md" | "lg";

export interface AppleSignInButtonProps extends ViewProps {
  size?: AppleButtonSize;
  fullWidth?: boolean;
  className?: string;
  onPress: () => void;
}
