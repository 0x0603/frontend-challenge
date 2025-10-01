"use client";

import { Address } from "viem";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";

import { ReactNode, createContext, useContext, useState } from "react";

interface WalletContextType {
  isConnected: boolean;
  address: string | undefined;
  connect: () => Promise<string>;
  disconnect: () => void;
  isLoading: boolean;
  error: Error | null;
  signMessage: (message: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProvider = ({ children }: WalletProviderProps) => {
  const { address, isConnected, ...rest } = useAccount();
  console.log("isConnected", { address, isConnected, rest });
  const { connectors, isPending, error, connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Use the first available connector (usually MetaMask or injected wallet)
      const connector = connectors[0];
      if (connector) {
        const { accounts } = (await connectAsync({ connector })) as unknown as {
          accounts: Address[];
        };
        if (accounts.length === 0 || !accounts[0]) {
          throw new Error("No wallet connected");
        }
        return accounts[0] as unknown as string;
      } else {
        throw new Error("No connector found");
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignMessage = async (message: string) => {
    const signature = await signMessageAsync({
      message,
    });

    return signature;
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const value: WalletContextType = {
    isConnected,
    address,
    connect: handleConnect,
    disconnect: handleDisconnect,
    isLoading: isPending || isLoading,
    error,
    signMessage: handleSignMessage,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default WalletProvider;

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};
