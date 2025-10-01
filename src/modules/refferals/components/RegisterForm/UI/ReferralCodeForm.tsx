import { useFormikContext } from "formik";

import { memo, useRef, useState } from "react";

import { Flex, Spinner, Text } from "@chakra-ui/react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  IRegisterFormValues,
  RegisterFormSteps,
} from "@/modules/refferals/components/RegisterForm/types/form";
import { useReferralContext } from "@/providers/ReferralProvider";
import { useWalletContext } from "@/providers/WalletProvider";
import { useReferralStore } from "@/states/referral";
import randomString from "@/utils/randomString";

const ReferralCodeForm = () => {
  const { values, setFieldValue, errors, isSubmitting } = useFormikContext<IRegisterFormValues>();
  const { referralCode, currentStep } = values;
  const { setReferralData } = useReferralStore();
  const { onCloseRegisterForm } = useReferralContext();
  const { connect, disconnect, signMessage } = useWalletContext();

  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);

  const handleLogin = async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);
    try {
      await disconnect();
      const walletAddressToUse = await connect();
      const signature = await signMessage(walletAddressToUse);

      const randomCode = randomString(6);
      setReferralData({
        enterCode: randomCode,
        email: "login@mocaverse.com",
        address: walletAddressToUse,
        signature,
        userCodes: Array.from({ length: 10 }, () => randomString(6)),
      });
      onCloseRegisterForm();
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  };

  return (
    <>
      <Input
        placeholder="Enter your referral code"
        value={referralCode}
        onChange={(e) => setFieldValue("referralCode", e.target.value)}
        error={errors?.referralCode}
        autoFocus
      />
      <Flex flexDirection="column" gap="8px" align="center">
        <Button
          type="submit"
          mt="auto"
          styleVariant="gradient"
          loading={isSubmitting && currentStep === RegisterFormSteps.ENTER_CODE}
          loadingText="Verifying..."
          disabled={isLoading}
        >
          Next
        </Button>
        <Text
          color="var(--text)"
          fontSize="12px"
          fontWeight="400"
          cursor="pointer"
          transition="all 0.3s ease"
          _hover={{ opacity: 0.8, textDecoration: "underline" }}
          _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
          onClick={handleLogin}
          alignItems="center"
          display="flex"
          gap="6px"
        >
          Already registered? {isLoading && <Spinner size="xs" />}
        </Text>
      </Flex>
    </>
  );
};

export default memo(ReferralCodeForm);
