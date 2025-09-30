import type { Metadata } from "next";
import { Reem_Kufi } from "next/font/google";
import localFont from "next/font/local";

import "../styles/globals.scss";
import Providers from "./providers";

const norse = localFont({
  src: "../../public/fonts/Norse.otf",
  variable: "--font-norse",
  display: "swap",
});

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mocaverse",
  description:
    "Mocaverse is the Animoca Brands membership NFT collection of 8,888 unique beings: The Mocas. Join the Mocas in the realms to Learn, Play, Do Good, and Build together as we champion our Web3 values!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Norse.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${norse.variable} ${reemKufi.variable} app-container`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
