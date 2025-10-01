export enum RegisterFormSteps {
  ENTER_CODE = "ENTER_CODE",
  SUBMIT = "SUBMIT",
}

export interface IStep {
  key: RegisterFormSteps;
  title: string;
  ref: React.RefObject<HTMLDivElement | null>;
}
