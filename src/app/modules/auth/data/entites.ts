import * as Yup from "yup";

export interface ILoginForm {
  username: string;
  password: string;
}

export const loginFormValidation = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});
