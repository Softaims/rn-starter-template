// src/stores/revenuecat.store.ts
import { create } from "zustand";
import revenuecatService from "../services/revnueCat.service";
import { RCOfferings, RCSubscriptionState } from "../../types/revnueCat.types";
import { CustomerInfo, PurchasesPackage } from "react-native-purchases";

type RevenuecatState = RCSubscriptionState & {
  initialize: () => Promise<void>;
  purchase: (pkg: PurchasesPackage) => Promise<void>;
  restore: () => Promise<void>;
  refreshCustomerInfo: () => Promise<void>;
};

export const useRevenuecatStore = create<RevenuecatState>((set) => ({
  offerings: null,
  customerInfo: null,
  activeEntitlements: [],
  isLoading: false,
  error: null,

  initialize: async () => {
    set({ isLoading: true, error: null });
    try {
      revenuecatService.configure();

      const offerings: RCOfferings | null =
        await revenuecatService.getOfferings();
      const customerInfo: CustomerInfo =
        await revenuecatService.getCustomerInfo();

      set({
        offerings,
        customerInfo,
        activeEntitlements: Object.keys(customerInfo.entitlements.active || {}),
        isLoading: false,
      });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
    }
  },

  purchase: async (pkg: PurchasesPackage) => {
    set({ isLoading: true, error: null });
    try {
      const customerInfo: CustomerInfo =
        await revenuecatService.purchasePackage(pkg);

      set({
        customerInfo,
        activeEntitlements: Object.keys(customerInfo.entitlements.active || {}),
        isLoading: false,
      });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
    }
  },

  restore: async () => {
    set({ isLoading: true, error: null });
    try {
      const customerInfo: CustomerInfo =
        await revenuecatService.restorePurchases();

      set({
        customerInfo,
        activeEntitlements: Object.keys(customerInfo.entitlements.active || {}),
        isLoading: false,
      });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
    }
  },

  refreshCustomerInfo: async () => {
    try {
      const customerInfo: CustomerInfo =
        await revenuecatService.getCustomerInfo();

      set({
        customerInfo,
        activeEntitlements: Object.keys(customerInfo.entitlements.active || {}),
      });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  changePlan: async (newPkg: PurchasesPackage) => {
    set({ isLoading: true, error: null });
    try {
      const state = useRevenuecatStore.getState();
      const oldProductId = state.customerInfo?.activeSubscriptions?.[0]; // first active sub

      if (!oldProductId) {
        throw new Error("No active subscription found");
      }

      const customerInfo = await revenuecatService.changeSubscription(
        newPkg,
        oldProductId
      );

      set({
        customerInfo,
        activeEntitlements: Object.keys(customerInfo.entitlements.active || {}),
        isLoading: false,
      });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
    }
  },
}));
