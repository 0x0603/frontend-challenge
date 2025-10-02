import { useFormikContext } from "formik";

import { memo, useEffect, useMemo, useRef } from "react";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import {
  IRegisterFormValues,
  RegisterFormSteps,
} from "@/modules/refferals/components/RegisterForm/types/form";
import { IStep } from "@/modules/refferals/components/RegisterForm/types/form";

import InforForm from "./InfoForm";
import ReferralCodeForm from "./ReferralCodeForm";
import Success from "./Success";

const FormTitle = ({ text }: { text: string }) => (
  <Text textAlign="center" className="text-subtitle" fontSize="28px">
    {text}
  </Text>
);

const Content = () => {
  const { values } = useFormikContext<IRegisterFormValues>();
  const { currentStep } = values;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const enterCodeStepRef = useRef<HTMLDivElement>(null);
  const submitStepRef = useRef<HTMLDivElement>(null);
  const successStepRef = useRef<HTMLDivElement>(null);

  const renderStep = ({ key, ref, title }: IStep) => {
    let component = null;
    switch (key) {
      case RegisterFormSteps.ENTER_CODE:
        component = <ReferralCodeForm />;
        break;
      case RegisterFormSteps.SUBMIT:
        component = <InforForm />;
        break;
      case RegisterFormSteps.SUCCESS:
        component = <Success />;
        break;
    }

    return (
      <VStack
        minWidth="50%"
        flex="0 0 50%"
        key={key}
        ref={ref}
        gap="32px"
        p="8px"
        h="100%"
        align="stretch"
      >
        <FormTitle text={title} />
        {component}
      </VStack>
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
      {
        key: RegisterFormSteps.SUCCESS,
        ref: successStepRef,
        title: "",
      },
    ],
    [],
  );

  // Auto-scroll to current step
  useEffect(() => {
    const scrollToStep = () => {
      if (!scrollContainerRef.current) return;
      const currentStepRef = steps.find((_step) => _step.key === currentStep)?.ref?.current;
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
  }, [currentStep]);

  return (
    <Box
      ref={scrollContainerRef}
      minHeight="250px"
      width="100%"
      position="relative"
      overflow="hidden"
      mt="24px"
      className="hide-scrollbar"
      userSelect="none"
      onDragStart={(e) => e.preventDefault()}
    >
      <Flex gap="0" align="stretch" minWidth="200%">
        {steps.map((step) => renderStep(step))}
      </Flex>
    </Box>
  );
};

export default memo(Content);
