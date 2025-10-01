import { useFormikContext } from "formik";

import Button from "@/components/Button";
import Input from "@/components/Input";

import { IRegisterFormValues } from "../types/form";

const InfoForm = () => {
  const { isSubmitting } = useFormikContext<IRegisterFormValues>();

  return (
    <>
      <Input
        placeholder="Enter your email"
        type="email"
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" styleVariant="gradient" flex={1} loading={isSubmitting}>
        Connect Wallet
      </Button>
    </>
  );
};

export default InfoForm;
