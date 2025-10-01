import React, { ReactNode, createContext, useContext } from "react";

import { useDisclosure } from "@chakra-ui/react";

interface ReferralContextType {
  openRegisterForm: boolean;
  onOpenRegisterForm: () => void;
  onCloseRegisterForm: () => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider = ({ children }: { children: ReactNode }) => {
  const {
    open: openRegisterForm,
    onOpen: onOpenRegisterForm,
    onClose: onCloseRegisterForm,
  } = useDisclosure();

  const value: ReferralContextType = {
    openRegisterForm: openRegisterForm,
    onOpenRegisterForm: onOpenRegisterForm,
    onCloseRegisterForm: onCloseRegisterForm,
  };

  return <ReferralContext.Provider value={value}>{children}</ReferralContext.Provider>;
};

export const useReferralContext = () => {
  const context = useContext(ReferralContext);
  if (!context) {
    throw new Error("useReferralContext must be used within a ReferralProvider");
  }
  return context;
};
