import { memo } from "react";

import { Box, Text, useDisclosure } from "@chakra-ui/react";

import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import MainLayout from "@/components/MainLayout";

import styles from "./styles.module.scss";

const Referrals = () => {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <MainLayout>
      <Box className={styles.authSection}>
        <Text
          fontSize={{ base: "32px", md: "40px" }}
          fontWeight="700"
          fontFamily="var(--font-norse)"
        >
          REFERRALS
        </Text>
        <Text fontSize={{ base: "16px", md: "20px" }} color="var(--text-secondary)">
          Refer Friends. Explore the Mocaverse Together. Earn Rewards on Every NFT Trade. You and
          your friend each earn a <strong className={styles.highlight}>10%</strong> commission on
          every NFT trade on Mocaverse.
        </Text>
        <Button mt="42px" onClick={onOpen}>
          Enter Referral Code
        </Button>
      </Box>
      <Dialog open={open} onClose={onClose} title="Enter Referral Code">
        <Box></Box>
      </Dialog>
    </MainLayout>
  );
};

export default memo(Referrals);
