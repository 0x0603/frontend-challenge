import { useFormikContext } from "formik";

import { memo } from "react";

import { Text, VStack } from "@chakra-ui/react";

import Button from "@/components/Button";
import { useReferralContext } from "@/providers/ReferralProvider";

import { IRegisterFormValues } from "../types/form";

const Success = () => {
  const { onCloseRegisterForm } = useReferralContext();
  const { values } = useFormikContext<IRegisterFormValues>();
  const { email } = values;

  const handleStartOver = () => {
    onCloseRegisterForm();
  };

  return (
    <VStack gap="32px" p="8px" h="100%" align="stretch" justify="center">
      <VStack gap="16px" textAlign="center">
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

      <Button onClick={handleStartOver} styleVariant="gradient" width="100%">
        Start Over
      </Button>
    </VStack>
  );
};

export default memo(Success);
