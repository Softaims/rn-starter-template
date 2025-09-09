import { useEffect } from "react";
import { useRevenuecatStore } from "../stores/revnueCat.store";

export function usePaywall() {
  const { initialize, offerings, purchase, restore, customerInfo, isLoading } =
    useRevenuecatStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    offerings,
    customerInfo,
    purchase,
    restore,
    isLoading,
  };
}
