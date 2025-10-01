import { CODE_LENGTH, isValidEmail, isValidInviteCode } from "@/utils/validators";

import { IRegisterFormValues, RegisterFormSteps } from "../types/form";

const useValidateForm = () => {
  const validate = (values: IRegisterFormValues) => {
    const errors: Partial<IRegisterFormValues> = {};

    switch (values.currentStep) {
      case RegisterFormSteps.ENTER_CODE:
        if (!values.referralCode) {
          errors.referralCode = "Referral code is required";
        } else if (!isValidInviteCode(values.referralCode)) {
          errors.referralCode = `Referral code must be ${CODE_LENGTH} characters long`;
        }
        break;
      case RegisterFormSteps.SUBMIT:
        if (!values.email) {
          errors.email = "Email is required";
        } else if (!isValidEmail(values.email)) {
          errors.email = "Invalid email address";
        }
        break;
    }

    return errors;
  };
  return { validate };
};

export default useValidateForm;
