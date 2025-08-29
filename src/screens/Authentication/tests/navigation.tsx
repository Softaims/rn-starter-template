// src/components/test/TestNavigation.tsx
import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../../components/atoms/Buttons/Button";
import CustomText from "../../../components/atoms/CustomText/CustomText";

const TestNavigation: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <CustomText variant="heading" size="2xl" className="mb-8 text-center">
        🧪 Testing Suite
      </CustomText>

      <View className="space-y-4">
        <Button
          variant="primary"
          size="lg"
          onPress={() => navigation.navigate("AuthTest" as never)}
        >
          <CustomText>
            🧪 Testing Suite
          </CustomText>
        </Button>

        {/* <Button
          variant="secondary"
          size="lg"
          onPress={() => navigation.navigate("SignUp" as never)}
        >
          Real SignUp Screen
        </Button>

        <Button
          variant="outline"
          size="lg"
          onPress={() => navigation.navigate("Login" as never)}
        >
          Real Login Screen
        </Button> */}
      </View>

      <View className="mt-8 p-4 bg-gray-50 rounded-lg">
        <CustomText variant="subtitle" className="mb-2">
          Architecture Overview:
        </CustomText>
        <CustomText size="sm" color="secondary">
          Screen → ViewModel → Store → Service → Mock
        </CustomText>
        <CustomText size="sm" color="secondary" className="mt-1">
          This test validates each layer without external dependencies.
        </CustomText>
      </View>
    </View>
  );
};

export default TestNavigation;
