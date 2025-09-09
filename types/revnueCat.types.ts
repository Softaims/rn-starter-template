import { CustomerInfo, PurchasesPackage } from "react-native-purchases";

/**
 * RevenueCat Entitlement model
 */
export type RCEntitlement = {
  identifier: string;
  isActive: boolean;
  latestPurchaseDate?: string;
  expirationDate?: string | null;
};

/**
 * RevenueCat Offering (not exported by SDK, so we define our own)
 */
export type RCOffering = {
  identifier: string;
  availablePackages: PurchasesPackage[];
};

/**
 * RevenueCat Offerings response
 */
export type RCOfferings = {
  current?: RCOffering | null;
  all: Record<string, RCOffering>;
};

/**
 * RevenueCat subscription state wrapper
 */
export type RCSubscriptionState = {
  customerInfo: CustomerInfo | null;
  activeEntitlements: string[];
  offerings: RCOfferings | null;
  isLoading: boolean;
  error: string | null;
};
