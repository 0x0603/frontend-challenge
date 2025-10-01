import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";

interface ReferralContextType {
  openDialog: boolean;
  onOpenDialog: () => void;
  onCloseDialog: () => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider = ({ children }: { children: ReactNode }) => {
  const { open, onOpen, onClose } = useDisclosure();

  const [inited, setInited] = useState(false);

  const value: ReferralContextType = {
    openDialog: open,
    onOpenDialog: onOpen,
    onCloseDialog: onClose,
  };

  useEffect(() => {
    if (inited) return;
    setTimeout(() => {
      setInited(true);
    }, 100);
  }, []);

  return <ReferralContext.Provider value={value}>{inited && children}</ReferralContext.Provider>;
};

export const useReferralContext = () => {
  const context = useContext(ReferralContext);
  if (!context) {
    throw new Error("useReferralContext must be used within a ReferralProvider");
  }
  return context;
};
