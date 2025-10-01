import { useFormikContext } from "formik";

import { memo } from "react";

import Button from "@/components/Button";
import Input from "@/components/Input";

import { IRegisterFormValues, RegisterFormSteps } from "../types/form";

const InfoForm = () => {
  const { isSubmitting, values, setFieldValue, errors } = useFormikContext<IRegisterFormValues>();
  const { currentStep, email } = values;
  return (
    <>
      <Input
        placeholder="Enter your email"
        type="email"
        value={email}
        error={errors?.email}
        onChange={(e) => setFieldValue("email", e.target.value)}
      />
      <Button
        type="submit"
        styleVariant="gradient"
        flex={1}
        loading={isSubmitting && currentStep === RegisterFormSteps.SUBMIT}
        loadingText="Connecting..."
      >
        Connect Wallet
      </Button>
    </>
  );
};

export default memo(InfoForm);
