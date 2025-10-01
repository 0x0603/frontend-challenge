import { useEffect, useMemo, useRef, useState } from "react";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import { IStep, RegisterFormSteps } from "@/modules/refferals/types/register-form";

import InforForm from "./InforForm";
import InviteCodeForm from "./InviteCodeForm";

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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const enterCodeStepRef = useRef<HTMLDivElement>(null);
  const submitStepRef = useRef<HTMLDivElement>(null);

  const nextStep = () => {
    if (step === RegisterFormSteps.ENTER_CODE) {
      setStep(RegisterFormSteps.SUBMIT);
    }
  };

  const renderStep = ({ key, ref, title }: IStep) => {
    let component = null;
    switch (key) {
      case RegisterFormSteps.ENTER_CODE:
        component = <InviteCodeForm nextStep={nextStep} />;
        break;
      case RegisterFormSteps.SUBMIT:
        component = <InforForm />;
        break;
    }

    return (
      <Box minWidth="50%" flex="0 0 50%" key={key} ref={ref}>
        <FormContainer>
          <FormTitle text={title} />
          {component}
        </FormContainer>
      </Box>
    );
  };

  const steps: IStep[] = useMemo(
    () => [
      {
        key: RegisterFormSteps.ENTER_CODE,
        ref: enterCodeStepRef,
        title: "Enter Referral Code",
      },
      {
        key: RegisterFormSteps.SUBMIT,
        ref: submitStepRef,
        title: "Join Us",
      },
    ],
    [],
  );

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
  }, [step]);

  return (
    <Box
      ref={scrollContainerRef}
      minHeight="250px"
      width="100%"
      position="relative"
      overflowY="hidden"
      overflowX="auto"
      mt="24px"
      className="hide-scrollbar"
    >
      <Flex gap="0" align="stretch" minWidth="200%">
        {steps.map((step) => renderStep(step))}
      </Flex>
    </Box>
  );
};

export default RegisterForm;
