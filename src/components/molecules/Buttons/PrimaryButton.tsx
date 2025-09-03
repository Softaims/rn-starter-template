import React from "react";
import Button from "../../atoms/Buttons/Button";
import CustomText from "../../atoms/CustomText/CustomText";
import { ButtonProps } from "../../atoms/Buttons/Button.types";

// Molecule wrapper around Button atom
const PrimaryButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="primary"
      size="lg"
      fullWidth
      className="mb-6"
      {...props}
    >
      <CustomText variant="default" size="md" color="primary">
        {children}
      </CustomText>
    </Button>
  );
};

export default PrimaryButton;
