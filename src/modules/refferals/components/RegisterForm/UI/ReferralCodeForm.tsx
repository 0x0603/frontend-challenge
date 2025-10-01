import { useFormikContext } from "formik";

import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  IRegisterFormValues,
  RegisterFormSteps,
} from "@/modules/refferals/components/RegisterForm/types/form";

const ReferralCodeForm = () => {
  const { values, setFieldValue, errors, isSubmitting } = useFormikContext<IRegisterFormValues>();
  const { referralCode, currentStep } = values;

  return (
    <>
      <Input
        placeholder="Enter your referral code"
        value={referralCode}
        onChange={(e) => setFieldValue("referralCode", e.target.value)}
        error={errors?.referralCode}
        autoFocus
      />
      <Button
        type="submit"
        mt="auto"
        styleVariant="gradient"
        loading={isSubmitting && currentStep === RegisterFormSteps.ENTER_CODE}
      >
        Next
      </Button>
    </>
  );
};

export default ReferralCodeForm;
