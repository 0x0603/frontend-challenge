import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import Button from "@/components/Button";
import Input from "@/components/Input";

enum RegisterFormSteps {
  ENTER_CODE = "ENTER_CODE",
  SUBMIT = "SUBMIT", // Sign message with wallet and enter email
}

// Reusable animated step wrapper
const AnimatedStep = ({ children, stepKey }: { children: React.ReactNode; stepKey: string }) => (
  <motion.div
    key={stepKey}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    style={{ flex: 1 }}
  >
    {children}
  </motion.div>
);

const FormContainer = ({ children }: { children: React.ReactNode }) => (
  <VStack gap="32px" align="stretch" p="8px">
    {children}
  </VStack>
);

const FormTitle = ({ text }: { text: string }) => (
  <Text textAlign="center" className="text-subtitle" fontSize="28px">
    {text}
  </Text>
);

const RegisterForm = () => {
  const [step, setStep] = useState(RegisterFormSteps.ENTER_CODE);
  const [referralCode, setReferralCode] = useState("");
  const [email, setEmail] = useState("");

  const nextStep = () => {
    if (step === RegisterFormSteps.ENTER_CODE) {
      setStep(RegisterFormSteps.SUBMIT);
    }
  };

  const prevStep = () => {
    if (step === RegisterFormSteps.SUBMIT) {
      setStep(RegisterFormSteps.ENTER_CODE);
    }
  };

  const renderEnterCodeStep = () => (
    <AnimatedStep stepKey="enter-code">
      <FormContainer>
        <FormTitle text="Enter Referral Code" />
        <Input
          placeholder="Enter your referral code"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
        />
        <Button onClick={nextStep} disabled={!referralCode.trim()} mt="auto">
          Next
        </Button>
      </FormContainer>
    </AnimatedStep>
  );

  const renderSubmitStep = () => (
    <AnimatedStep stepKey="submit">
      <FormContainer>
        <FormTitle text="Complete Registration" />
        <Text color="var(--text-secondary)" textAlign="center">
          Referral Code:
          <Text as="span" color="var(--text)">
            {referralCode}
          </Text>
        </Text>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Flex gap={3} mt="auto">
          <Button variant="outline" onClick={prevStep} flex={1}>
            Back
          </Button>
          <Button onClick={() => console.log("Submit")} disabled={!email.trim()} flex={1}>
            Submit
          </Button>
        </Flex>
      </FormContainer>
    </AnimatedStep>
  );

  return (
    <Box minHeight="220px" position="relative" overflow="hidden" mt="24px">
      <AnimatePresence mode="wait">
        {step === RegisterFormSteps.ENTER_CODE && renderEnterCodeStep()}
        {step === RegisterFormSteps.SUBMIT && renderSubmitStep()}
      </AnimatePresence>
    </Box>
  );
};

export default RegisterForm;
