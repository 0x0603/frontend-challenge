"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

import WagmiProvider from "@/providers/WagmiProvider";
import WalletProvider from "@/providers/WalletProvider";

const system = createSystem(defaultConfig, {
  globalCss: {
    body: {},
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <WagmiProvider>
        <WalletProvider>{children}</WalletProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}
