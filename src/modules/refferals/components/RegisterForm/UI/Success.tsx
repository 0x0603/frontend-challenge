import { useFormikContext } from "formik";

import { Box, Text, VStack } from "@chakra-ui/react";

import Button from "@/components/Button";
import { useReferralContext } from "@/providers/ReferralProvider";

import { IRegisterFormValues } from "../types/form";

const Success = () => {
  const { onCloseDialog } = useReferralContext();
  const { values } = useFormikContext<IRegisterFormValues>();
  const { email } = values;

  const handleStartOver = () => {
    onCloseDialog();
  };

  return (
    <VStack gap="32px" p="8px" h="100%" align="stretch" justify="center">
      <VStack gap="16px" textAlign="center">
        <Box
          width="80px"
          height="80px"
          borderRadius="50%"
          bg="green.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="40px"
          color="white"
        >
          ✓
        </Box>

        <Text fontSize="28px" fontWeight="bold" color="white">
          Welcome Aboard!
        </Text>

        <Text fontSize="16px" color="gray.300" maxWidth="400px">
          {"You've successfully joined our referral program. We've sent a confirmation email to "}
          <Text as="span" color="white" fontWeight="medium">
            {email}
          </Text>
        </Text>
      </VStack>

      <VStack gap="12px">
        <Button onClick={handleStartOver} styleVariant="gradient" width="100%">
          Start Over
        </Button>
      </VStack>
    </VStack>
  );
};

export default Success;
