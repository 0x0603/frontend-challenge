import { memo } from "react";

import { Box, Text, useDisclosure } from "@chakra-ui/react";

import Button from "@/components/Button";
import ClientOnly from "@/components/ClientOnly";
import Dialog from "@/components/Dialog";
import MainLayout from "@/components/MainLayout";

import RegisterForm from "./components/RegisterForm";
import styles from "./styles.module.scss";

const Referrals = () => {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <MainLayout>
      <Box className={styles.authSection}>
        <Text className="text-title">REFERRALS</Text>
        <Text className="text-subtitle" color="var(--text-secondary)">
          Refer Friends. Explore the Mocaverse Together. Earn Rewards on Every NFT Trade.You and
          your friend each earn a <strong className={styles.highlight}>10%</strong> commission on
          every NFT trade on Mocaverse.
        </Text>
        <Button mt="42px" onClick={onOpen}>
          Enter Referral Code
        </Button>
      </Box>
      <ClientOnly>
        <Dialog open={open} onClose={onClose}>
          <RegisterForm />
        </Dialog>
      </ClientOnly>
    </MainLayout>
  );
};

export default memo(Referrals);
