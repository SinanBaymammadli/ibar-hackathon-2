import * as Yup from "yup";

interface ITemplateBase {
  name: string;
  email: string;
}

export interface ITemplate extends ITemplateBase {
  id: string;
}

export interface ITemplateForm extends ITemplateBase {
  password?: string;
}

const templateCommonValidation = {
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required(),
};

export const templateFormValidation = Yup.object<ITemplateForm>({
  ...templateCommonValidation,
});

export const templateEditFormValidation = Yup.object<ITemplateForm>({
  ...templateCommonValidation,
});

export const templateFromJson = (json: any): ITemplate => {
  const e: ITemplate = {
    id: json.id?.toString(),
    name: json.name?.toString(),
    email: json.email?.toString(),
  };

  return e;
};

export const templateToJson = (form: ITemplateForm) => {
  return {
    name: form.name.toString(),
    email: form.email.toString(),
    password: form.password?.toString(),
  };
};
