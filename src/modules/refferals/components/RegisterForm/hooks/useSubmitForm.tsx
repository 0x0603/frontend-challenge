import { AxiosError } from "axios";
import { FormikHelpers } from "formik";
import { useConnect } from "wagmi";

import {
  IRegisterFormValues,
  RegisterFormSteps,
} from "@/modules/refferals/components/RegisterForm/types/form";
import { useWalletContext } from "@/providers/WalletProvider";
import InvideService from "@/services/InvideService";
import { IReservePayload } from "@/services/InvideService/types";
import { getErrorMessage } from "@/services/instance";

const useSubmitForm = () => {
  const { signMessage, isConnected, address, connect } = useWalletContext();

  const { connectors } = useConnect();

  const verifyReferralCode = async (referralCode: string) => {
    const response = await InvideService.verifyCode(referralCode);
    return response.ok;
  };

  const checkIsEmailUsed = async (email: string) => {
    const response = await InvideService.isEmailUsed(email);
    return response.ok;
  };

  const checkIsWalletUsed = async (walletAddress: string) => {
    const response = await InvideService.isWalletUsed(walletAddress);
    return response.ok;
  };

  const reserveInvite = async (payload: IReservePayload) => {
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
          await verifyReferralCode(values.referralCode);
          setFieldValue("currentStep", RegisterFormSteps.SUBMIT);
          break;
        case RegisterFormSteps.SUBMIT:
          if (connectors.length === 0) {
            // open install metamask page
            window.open("https://metamask.io/download/", "_blank");
            return;
          }
          await checkIsEmailUsed(values.email);

          // Ensure we have a wallet connection
          let connectedWalletAddress = address;
          if (!isConnected) {
            connectedWalletAddress = await connect();
          }

          const walletAddressToUse = connectedWalletAddress || "";
          await checkIsWalletUsed(walletAddressToUse);

          const signature = await signMessage(walletAddressToUse);

          await reserveInvite({
            code: values.referralCode,
            email: values.email,
            wallet: walletAddressToUse,
            signature,
          });
          setFieldValue("currentStep", RegisterFormSteps.SUCCESS);
          break;
      }
    } catch (error) {
      onError(error, values, setErrors);
    }
  };

  return { onSubmit };
};

export default useSubmitForm;
