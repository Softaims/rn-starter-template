import Purchases, { LOG_LEVEL, CustomerInfo, PurchasesPackage } from "react-native-purchases";
import { Platform, NativeModules } from "react-native";
import { REVENUECAT_KEYS } from "../../config/revnueCat";

const revenuecatService = {
  configure: () => {
    try {
      // Check if the native module is available
      if (!NativeModules.RNPurchases) {
        console.warn('RevenueCat native module not available');
        return;
      }

      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

      if (Platform.OS === "ios") {
        Purchases.configure({ apiKey: REVENUECAT_KEYS.ios });
      } else if (Platform.OS === "android") {
        // Purchases.configure({ apiKey: REVENUECAT_KEYS.android });
      } else {
        // Purchases.configure({ apiKey: REVENUECAT_KEYS.amazon, useAmazon: true });
      }
    } catch (error) {
      console.warn('Failed to configure RevenueCat:', error);
    }
  },

  getOfferings: async () => {
    try {
      if (!NativeModules.RNPurchases) {
        throw new Error('RevenueCat not available');
      }
      const offerings = await Purchases.getOfferings();
      return offerings.current;
    } catch (error) {
      console.warn('Failed to get offerings:', error);
      return null;
    }
  },

  purchasePackage: async (pkg: PurchasesPackage) => {
    try {
      if (!NativeModules.RNPurchases) {
        throw new Error('RevenueCat not available');
      }
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      return customerInfo;
    } catch (error) {
      console.warn('Failed to purchase package:', error);
      throw error;
    }
  },

  restorePurchases: async (): Promise<CustomerInfo> => {
    try {
      if (!NativeModules.RNPurchases) {
        throw new Error('RevenueCat not available');
      }
      return await Purchases.restorePurchases();
    } catch (error) {
      console.warn('Failed to restore purchases:', error);
      throw error;
    }
  },

  getCustomerInfo: async (): Promise<CustomerInfo> => {
    try {
      if (!NativeModules.RNPurchases) {
        throw new Error('RevenueCat not available');
      }
      return await Purchases.getCustomerInfo();
    } catch (error) {
      console.warn('Failed to get customer info:', error);
      throw error;
    }
  },

   changeSubscription: async (newPackage: PurchasesPackage, oldProductId: string) => {
    try {
      // RevenueCat expects a plain object with oldSKU for Android
      const upgradeInfo = { oldSKU: oldProductId };

      const { customerInfo } = await Purchases.purchasePackage(newPackage, upgradeInfo);

      return customerInfo;
    } catch (error) {
      console.warn("Failed to change subscription:", error);
      throw error;
    }
  },
};

export default revenuecatService;