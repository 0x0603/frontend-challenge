import { useState } from "react";

import { Box, Flex, Image, Text } from "@chakra-ui/react";

import Button from "@/components/Button";
import { useWalletContext } from "@/providers/WalletProvider";
import { useReferralStore } from "@/states/referral";
import shareX from "@/utils/shareX";

import styles from "./styles.module.scss";

const AuthenticatedCard = () => {
  const { referralData, resetReferralData } = useReferralStore();
  const { disconnect } = useWalletContext();
  const [isCopied, setIsCopied] = useState(false);

  const handleShareOnX = () => {
    const referralCode = referralData?.userCodes?.[0];
    const shareUrl = "https://www.mocaverse.xyz/";
    const shareText = `🚀 Discover Mocaverse - The Ultimate NFT Marketplace! 🎨\n\n✨ Trade NFTs like never before\n💰 Earn 10% rewards on every trade\n🎁 Join my exclusive referral program\n\n🔑 Use my code: ${referralCode}\n\n🌟 Start your NFT journey today: ${shareUrl}`;

    shareX(shareText);
  };

  const handleCopyCode = async () => {
    const referralCode = referralData?.userCodes?.[0];
    if (referralCode) {
      try {
        await navigator.clipboard.writeText(referralCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  const handleLogout = () => {
    disconnect();
    resetReferralData();
  };

  return (
    <Flex className={styles.authenticatedCard}>
      <Flex className={styles.code}>
        <Text color="var(--text-secondary)">
          Your Referral Code:{` `}{" "}
          <Text as="strong" color="white" ml="4px">
            {referralData?.userCodes?.[0]}
          </Text>
        </Text>
        <Box onClick={handleCopyCode} cursor="pointer" w="12px">
          {isCopied ? (
            <Text fontSize="14px" color="green.400">
              ✓
            </Text>
          ) : (
            <Text fontSize="14px" color="var(--text-secondary)">
              📄
            </Text>
          )}
        </Box>
      </Flex>

      <Box
        maxW={{
          lg: "315px",
          base: "100%",
        }}
        w="100%"
      >
        <Button textTransform="uppercase" onClick={handleShareOnX}>
          Share on <Image src="/svg/x.svg" alt="X" width="18px" height="18px" />
        </Button>
        <Box onClick={handleLogout} className={styles.logout}>
          Logout
        </Box>
      </Box>
    </Flex>
  );
};

export default AuthenticatedCard;
