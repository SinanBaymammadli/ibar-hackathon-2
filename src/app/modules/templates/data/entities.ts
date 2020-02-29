import * as Yup from "yup";
import { Maybe } from "../../../core/models";
import { IImage, generateImage } from "../../../core/utils";
import { fileValidation } from "../../../core/file";

export enum EPeriod {
  Quarter,
  SemiYear,
  Year,
}

interface ITemplateBase {
  name: string;
  businessTypeId: string;
  period: EPeriod;
  file: Maybe<File>;
}

export interface ITemplate extends ITemplateBase {
  id: string;
  image: IImage;
}

export interface ITemplateForm extends ITemplateBase {}

const templateCommonValidation = {
  name: Yup.string().required(),
  businessTypeId: Yup.string().required(),
  period: Yup.mixed<EPeriod>().required(),
};

export const templateFormValidation = Yup.object<ITemplateForm>({
  ...templateCommonValidation,
  file: fileValidation,
});

export const templateEditFormValidation = Yup.object<ITemplateForm>({
  ...templateCommonValidation,
  file: fileValidation,
});

export const templateFromJson = (json: any): ITemplate => {
  const e: ITemplate = {
    id: json.id?.toString(),
    name: json.name?.toString(),
    file: null,
    image: generateImage(json),
    businessTypeId: json.businessType?.id,
    period: json.periodic,
  };

  return e;
};

export const templateToJson = (form: ITemplateForm) => {
  return {
    name: form.name.toString(),
    // file: form.file,
    businessTypeId: parseFloat(form.businessTypeId),
    periodic: parseFloat(form.period.toString()),
  };
};
