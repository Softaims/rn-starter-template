import React from "react";
import { View, TouchableOpacity } from "react-native";
import { RedirectItemProps } from "./RedirectItem.types";
import CustomText from "../../atoms/CustomText/CustomText";
import { redirectItemVariants } from "./RedirectItem.variants";

const RedirectItem: React.FC<RedirectItemProps> = ({
  message,
  actionLabel,
  onPress,
  className,
  align = "center",
  spacing = "md",
}) => (
  <View className={redirectItemVariants({ align, spacing, className })}>
    <CustomText variant="default" color="secondary">
      {message}
    </CustomText>
    <TouchableOpacity onPress={onPress}>
      <CustomText variant="default" color="primary" className="font-medium">
        {actionLabel}
      </CustomText>
    </TouchableOpacity>
  </View>
);

export default RedirectItem;