import { Box, Flex, Text } from "@chakra-ui/react";

import styles from "./styles.module.scss";

interface PointCardProps {
  tradingVolume?: number;
  claimedRebates?: number;
  unclaimedRebates?: number;
}

const PointCard = ({
  tradingVolume = 120,
  claimedRebates = 100,
  unclaimedRebates = 20,
}: PointCardProps) => {
  return (
    <Flex className={styles.pointCardContainer}>
      {/* Trading Volume Card */}
      <Box className={styles.card}>
        <Text className={styles.cardTitle}>TRADING VOLUME</Text>
        <Text className={styles.cardValue + " " + styles.cardValue_gradient}>
          {tradingVolume.toLocaleString()} USD
        </Text>
      </Box>

      {/* Claimed Rebates Card */}
      <Box className={styles.card}>
        <Flex className={styles.cardTitleWithIcon}>
          <Text className={styles.cardTitle}>CLAIMED REBATES</Text>
        </Flex>
        <Text className={styles.cardValue}>{claimedRebates.toLocaleString()} USD</Text>
      </Box>

      {/* Unclaimed Rebates Card */}
      <Box className={styles.card}>
        <Flex className={styles.cardTitleWithIcon}>
          <Text className={styles.cardTitle}>UNCLAIMED REBATES</Text>
        </Flex>
        <Text className={styles.cardValue}>{unclaimedRebates.toLocaleString()} USD</Text>
      </Box>
    </Flex>
  );
};

export default PointCard;
