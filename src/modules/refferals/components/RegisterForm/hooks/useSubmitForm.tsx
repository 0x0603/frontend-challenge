import { AxiosError } from "axios";
import { FormikHelpers } from "formik";

import {
  IRegisterFormValues,
  RegisterFormSteps,
} from "@/modules/refferals/components/RegisterForm/types/form";
import InvideService from "@/services/InvideService";
import { IReservePayload } from "@/services/InvideService/types";
import { getErrorMessage } from "@/services/instance";

const useSubmitForm = () => {
  const verifyCode = async (code: string) => {
    const response = await InvideService.verifyCode(code);
    console.log("response", response);
    return response.ok;
  };

  const isEmailUsed = async (email: string) => {
    const response = await InvideService.isEmailUsed(email);
    return response.ok;
  };

  const isWalletUsed = async (wallet: string) => {
    const response = await InvideService.isWalletUsed(wallet);
    return response.ok;
  };

  const onReserve = async (payload: IReservePayload) => {
    const response = await InvideService.reserve(payload);
    return response.ok;
  };

  const onError = (
    error: unknown,
    values: IRegisterFormValues,
    setErrors: FormikHelpers<IRegisterFormValues>["setErrors"],
  ) => {
    const errorMessage = getErrorMessage(
      error as unknown as AxiosError<{ message: string }> | Error,
    );

    if (values.currentStep === RegisterFormSteps.ENTER_CODE) {
      setErrors({ referralCode: errorMessage });
    } else {
      setErrors({ email: errorMessage });
    }
  };

  const onSubmit = async (
    values: IRegisterFormValues,
    { setFieldValue, setErrors }: FormikHelpers<IRegisterFormValues>,
  ) => {
    try {
      switch (values.currentStep) {
        case RegisterFormSteps.ENTER_CODE:
          await verifyCode(values.referralCode);
          setFieldValue("currentStep", RegisterFormSteps.SUBMIT);
          break;
        case RegisterFormSteps.SUBMIT:
          break;
      }
    } catch (error) {
      onError(error, values, setErrors);
    }
  };

  return { onSubmit };
};

export default useSubmitForm;
