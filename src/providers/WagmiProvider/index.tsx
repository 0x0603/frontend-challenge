import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider as WagmiProviderBase } from "wagmi";

import { config } from "./config";

const queryClient = new QueryClient();

const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProviderBase config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProviderBase>
  );
};

export default WagmiProvider;
