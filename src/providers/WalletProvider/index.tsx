"use client";

import { Address } from "viem";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { useAccountEffect } from "wagmi";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { useReferralStore } from "@/states/referral";

interface WalletContextType {
  isConnected: boolean;
  address: string | undefined;
  connect: () => Promise<string>;
  disconnect: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  signMessage: (message: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProvider = ({ children }: WalletProviderProps) => {
  const { address, isConnected } = useAccount();
  const { connectors, isPending, error, connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [isLoading, setIsLoading] = useState(false);
  const { resetReferralData } = useReferralStore();

  const [inited, setInited] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Check if MetaMask or any injected wallet is available
      if (typeof window !== "undefined" && !window.ethereum) {
        // No wallet installed, open MetaMask download page
        window.open("https://metamask.io/download/", "_blank");
        throw new Error("No wallet installed. Please install MetaMask to continue.");
      }

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

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      //TODO: handle error
    }
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

  useAccountEffect({
    onConnect() {
      console.log("Connected!");
    },
    onDisconnect() {
      console.log("Disconnected!");
      resetReferralData();
    },
  });

  useEffect(() => {
    if (inited) return;
    setTimeout(() => {
      setInited(true);
    }, 100);
  }, []);

  return <WalletContext.Provider value={value}>{inited && children}</WalletContext.Provider>;
};

export default WalletProvider;

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};
