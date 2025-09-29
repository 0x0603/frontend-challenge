"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
