// Divider.tsx
import React from "react";
import { View } from "react-native";
import CustomText from "../../atoms/CustomText/CustomText";
import { DividerProps } from "./Divider.types";
import { dividerVariants, dividerLineVariants, dividerTextVariants } from "./Divider.variants";
export const Divider: React.FC<DividerProps> = ({
  text,
  orientation = "horizontal",
  variant = "default",
  color = "default",
  size = "sm",
  textColor = "default",
  textSize = "sm",
}: DividerProps) => {
  const containerClasses = dividerVariants({ orientation });
  const lineClasses = dividerLineVariants({ variant, color, size });
  const textClasses = dividerTextVariants({ textColor, textSize });

  if (orientation === "vertical") {
    return (
      <View className={containerClasses}>
        <View className={lineClasses} />
        {text && (
          <CustomText
            variant="default"
            size={textSize}
            className={textClasses}
          >
            {text}
          </CustomText>
        )}
        <View className={lineClasses} />
      </View>
    );
  }

  return (
    <View className={containerClasses}>
      <View className={lineClasses} />
      {text && (
        <CustomText
          variant="default"
          size={textSize}
          className={textClasses}
        >
          {text}
        </CustomText>
      )}
      <View className={lineClasses} />
    </View>
  );
};