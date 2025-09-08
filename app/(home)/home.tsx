import React from "react";
import { Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useLogoutViewModel } from "../../src/viewModels/AuthenticationView/useLogoutViewModel";

const Home: React.FC = () => {
  const { user, handleSignOut } = useLogoutViewModel();

  return (
    <SafeAreaView>
      <Text className="text-xl mb-4">Welcome, {user?.email}</Text>

      <TouchableOpacity
        onPress={handleSignOut}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
