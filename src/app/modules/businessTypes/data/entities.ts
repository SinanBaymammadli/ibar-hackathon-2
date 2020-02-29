import * as Yup from "yup";
import { EActivityCategory } from "../../offers/data/entities";

export enum ETaxType {
  SimplifiedTax,
  IncomeTax,
}

export interface IBusinessTypeBase {
  workerCount: number;
  moneyLimit: number;
  category: EActivityCategory;
  name: string;
  taxType: ETaxType;
  vatType: boolean;
}

export interface IBusinessType extends IBusinessTypeBase {
  id: string;
}

export interface IBusinessTypeForm extends IBusinessTypeBase {}

const businessTypeCommonValidation = {
  name: Yup.string().required(),
  workerCount: Yup.number().required(),
  moneyLimit: Yup.number().required(),
  category: Yup.mixed<EActivityCategory>().required(),
  taxType: Yup.mixed<ETaxType>().required(),
  vatType: Yup.boolean().required(),
};

export const businessTypeFormValidation = Yup.object<IBusinessTypeForm>({
  ...businessTypeCommonValidation,
});

export const businessTypeEditFormValidation = Yup.object<IBusinessTypeForm>({
  ...businessTypeCommonValidation,
});

export const businessTypeFromJson = (json: any): IBusinessType => {
  const e: IBusinessType = {
    id: json.id,
    workerCount: json.workerCount,
    moneyLimit: json.moneyLimit,
    category: json.category,
    name: json.name?.toString(),
    taxType: json.taxType,
    vatType: Boolean(json.vatType),
  };

  return e;
};

export const businessTypeToJson = (form: IBusinessTypeForm) => {
  return {
    workerCount: form.workerCount,
    moneyLimit: form.moneyLimit,
    category: Number(form.category),
    name: form.name?.toString(),
    taxType: Number(form.taxType),
    vatType: form.vatType ? 1 : 0,
  };
};
