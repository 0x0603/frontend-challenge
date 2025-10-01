import { Form, FormikProvider, useFormik } from "formik";

import {
  IRegisterFormValues,
  RegisterFormSteps,
} from "@/modules/refferals/components/RegisterForm/types/form";

import useSubmitForm from "../hooks/useSubmitForm";
import useValidateForm from "../hooks/useValidateForm";
import Content from "./Content";

const initialValues: IRegisterFormValues = {
  email: "nx@gmail.com",
  referralCode: "123456",
  currentStep: RegisterFormSteps.ENTER_CODE,
};

const RegisterForm = () => {
  const { onSubmit } = useSubmitForm();
  const { validate } = useValidateForm();

  const formik = useFormik<IRegisterFormValues>({
    initialValues,
    onSubmit,
    validate,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Content />
      </Form>
    </FormikProvider>
  );
};

export default RegisterForm;
