export type GoogleButtonSize = "wide" | "icon";
export type GoogleButtonColor = "dark" | "light";

export interface GoogleSignInButtonProps {
  size?: GoogleButtonSize;
  color?: GoogleButtonColor;
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
}
