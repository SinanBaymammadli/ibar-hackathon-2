import * as Yup from "yup";

interface IBusinessTypeBase {
  name: string;
  email: string;
}

export interface IBusinessType extends IBusinessTypeBase {
  id: string;
}

export interface IBusinessTypeForm extends IBusinessTypeBase {
  password?: string;
}

const businessTypeCommonValidation = {
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required(),
};

export const businessTypeFormValidation = Yup.object<IBusinessTypeForm>({
  ...businessTypeCommonValidation,
});

export const businessTypeEditFormValidation = Yup.object<IBusinessTypeForm>({
  ...businessTypeCommonValidation,
});

export const businessTypeFromJson = (json: any): IBusinessType => {
  const e: IBusinessType = {
    id: json.id?.toString(),
    name: json.name?.toString(),
    email: json.email?.toString(),
  };

  return e;
};

export const businessTypeToJson = (form: IBusinessTypeForm) => {
  return {
    name: form.name.toString(),
    email: form.email.toString(),
    password: form.password?.toString(),
  };
};
