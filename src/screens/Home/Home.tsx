import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useLogoutViewModel } from "../../viewModels/AuthenticationView/useLogoutViewModel";

const Home: React.FC = () => {
  const { user, handleSignOut } = useLogoutViewModel();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl mb-4">Welcome, {user?.email}</Text>

      <TouchableOpacity
        onPress={handleSignOut}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-bold">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
