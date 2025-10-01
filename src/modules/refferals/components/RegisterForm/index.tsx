import { motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import Button from "@/components/Button";
import Input from "@/components/Input";

enum RegisterFormSteps {
  ENTER_CODE = "ENTER_CODE",
  SUBMIT = "SUBMIT", // Sign message with wallet and enter email
}

// Reusable step wrapper
const StepWrapper = ({ children, stepKey }: { children: React.ReactNode; stepKey: string }) => (
  <Box key={stepKey} flex={1}>
    {children}
  </Box>
);

const FormContainer = ({ children }: { children: React.ReactNode }) => (
  <VStack gap="32px" align="stretch" p="8px" h="100%">
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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const enterCodeStepRef = useRef<HTMLDivElement>(null);
  const submitStepRef = useRef<HTMLDivElement>(null);

  const nextStep = () => {
    if (step === RegisterFormSteps.ENTER_CODE) {
      setStep(RegisterFormSteps.SUBMIT);
    }
  };

  const renderEnterCodeStep = () => (
    <div ref={enterCodeStepRef}>
      <StepWrapper stepKey={RegisterFormSteps.ENTER_CODE}>
        <FormContainer>
          <FormTitle text="Enter Referral Code" />
          <Input
            placeholder="Enter your referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            autoFocus
          />
          <Button
            onClick={nextStep}
            disabled={!referralCode.trim()}
            mt="auto"
            styleVariant="gradient"
          >
            Next
          </Button>
        </FormContainer>
      </StepWrapper>
    </div>
  );

  const renderSubmitStep = () => (
    <div ref={submitStepRef}>
      <StepWrapper stepKey={RegisterFormSteps.SUBMIT}>
        <FormContainer>
          <FormTitle text="Join Us" />
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Flex gap={3} mt="auto">
            {/* <Button variant="outline" onClick={prevStep} flex={1}>
              Back
            </Button> */}
            <Button
              onClick={() => console.log("Submit")}
              disabled={!email.trim()}
              styleVariant="gradient"
              flex={1}
            >
              Submit
            </Button>
          </Flex>
        </FormContainer>
      </StepWrapper>
    </div>
  );

  const steps = [
    {
      key: RegisterFormSteps.ENTER_CODE,
      ref: enterCodeStepRef,
      component: renderEnterCodeStep,
    },
    {
      key: RegisterFormSteps.SUBMIT,
      ref: submitStepRef,
      component: renderSubmitStep,
    },
  ];

  // Auto-scroll to current step
  useEffect(() => {
    const scrollToStep = () => {
      if (!scrollContainerRef.current) return;

      const currentStepRef = steps.find((_step) => _step.key === step)?.ref?.current;

      if (currentStepRef) {
        currentStepRef.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToStep, 100);
    return () => clearTimeout(timeoutId);
  }, [step, steps]);

  return (
    <Box
      ref={scrollContainerRef}
      minHeight="220px"
      width="100%"
      position="relative"
      overflowY="hidden"
      overflowX="auto"
      mt="24px"
      className="hide-scrollbar"
    >
      <Flex gap="0" align="stretch" minWidth="200%">
        {steps.map((step) => (
          <Box minWidth="50%" flex="0 0 50%" key={step.key}>
            {step.component()}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default RegisterForm;
