import { memo } from "react";

import { Box, Text } from "@chakra-ui/react";

import Button from "@/components/Button";
import ClientOnly from "@/components/ClientOnly";
import Dialog from "@/components/Dialog";
import MainLayout from "@/components/MainLayout";
import { ReferralProvider, useReferralContext } from "@/providers/ReferralProvider";
import { useReferralStore } from "@/states/referral";

import AuthenticatedCard from "./components/AuthenticatedCard";
import ListReferred from "./components/ListReferred";
import PointCard from "./components/PointCard";
import RegisterForm from "./components/RegisterForm/UI";
import styles from "./styles.module.scss";

const Referrals = () => {
  const { openDialog, onOpenDialog, onCloseDialog } = useReferralContext();
  const { referralData } = useReferralStore();

  return (
    <MainLayout>
      <Box className={styles.authSection}>
        <Text className="text-title">REFERRALS</Text>
        <Text className="text-subtitle" color="var(--text-secondary)">
          Refer Friends. Explore the Mocaverse Together. Earn Rewards on Every NFT Trade. You and
          your friend each earn a <strong className={styles.highlight}>10%</strong> commission on
          every NFT trade on Mocaverse.
        </Text>
        {referralData ? (
          <>
            <AuthenticatedCard />
            <PointCard />
          </>
        ) : (
          <Button mt="42px" onClick={onOpenDialog}>
            Enter Referral Code
          </Button>
        )}
      </Box>
      <ListReferred />
      <ClientOnly>
        <Dialog open={openDialog} onClose={onCloseDialog}>
          <RegisterForm />
        </Dialog>
      </ClientOnly>
    </MainLayout>
  );
};

const Page = () => {
  return (
    <ReferralProvider>
      <Referrals />
    </ReferralProvider>
  );
};

export default memo(Page);
