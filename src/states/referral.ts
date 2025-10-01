import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IReferralData {
  enterCode: string;
  email: string;
  address: string;
  signature: string;
  userCodes: string[];
}

interface ReferralState {
  referralData?: IReferralData;
  setReferralData: (data: IReferralData) => void;
  resetReferralData: () => void;
}

export const useReferralStore = create<ReferralState>()(
  persist(
    (set) => ({
      referralData: undefined,
      setReferralData: (data: IReferralData) => set({ referralData: data }),
      resetReferralData: () => set({ referralData: undefined }),
    }),
    {
      name: "referral-store", // name of the item in storage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
