import * as Yup from "yup";
import { Maybe } from "../../../core/models";
import { IImage, generateImage } from "../../../core/utils";
import { fileValidation } from "../../../core/file";

interface ITemplateBase {
  name: string;
  file: Maybe<File>;
}

export interface ITemplate extends ITemplateBase {
  id: string;
  image: IImage;
}

export interface ITemplateForm extends ITemplateBase {
  password?: string;
}

const templateCommonValidation = {
  name: Yup.string().required(),
};

export const templateFormValidation = Yup.object<ITemplateForm>({
  ...templateCommonValidation,
  file: fileValidation,
});

export const templateEditFormValidation = Yup.object<ITemplateForm>({
  ...templateCommonValidation,
  file: fileValidation.required(),
});

export const templateFromJson = (json: any): ITemplate => {
  const e: ITemplate = {
    id: json.id?.toString(),
    name: json.name?.toString(),
    file: null,
    image: generateImage(json),
  };

  return e;
};

export const templateToJson = (form: ITemplateForm) => {
  return {
    name: form.name.toString(),
    file: form.file,
  };
};
