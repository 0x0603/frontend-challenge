export enum RegisterFormSteps {
  ENTER_CODE = "ENTER_CODE",
  SUBMIT = "SUBMIT",
  SUCCESS = "SUCCESS",
}

export interface IStep {
  key: RegisterFormSteps;
  title: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

export interface IRegisterFormValues {
  referralCode: string;
  email: string;
  currentStep: RegisterFormSteps;
}
