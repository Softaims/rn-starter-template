import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { usePaywall } from "../../src/hooks/usePaywall";
import { RCOffering } from "../../types/revnueCat.types";

export default function PaywallScreen() {
  const { offerings, purchase, restore, isLoading } = usePaywall();

  if (isLoading) return <ActivityIndicator size="large" />;

  if (!offerings || !offerings.current) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No offerings available</Text>
      </View>
    );
  }

  const currentOffering: RCOffering = offerings.current;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Upgrade Your Plan</Text>

      {currentOffering.availablePackages.map((pkg) => (
        <View key={pkg.identifier} style={{ marginVertical: 10 }}>
          <Text>{pkg.product.title}</Text>
          <Text>{pkg.product.description}</Text>
          <Text>{pkg.product.priceString}</Text>
          <Button title="Buy" onPress={() => purchase(pkg)} />
        </View>
      ))}

      <Button title="Restore Purchases" onPress={restore} />
    </View>
  );
}
