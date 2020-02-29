import * as Yup from "yup";

interface IOfferBase {
  name: string;
}

export interface IOffer extends IOfferBase {
  id: string;
}

export interface IOfferForm extends IOfferBase {}

const offerCommonValidation = {
  name: Yup.string().required(),
};

export const offerFormValidation = Yup.object<IOfferForm>({
  ...offerCommonValidation,
});

export const offerEditFormValidation = Yup.object<IOfferForm>({
  ...offerCommonValidation,
});

export const offerFromJson = (json: any): IOffer => {
  const e: IOffer = {
    id: json.id?.toString(),
    name: json.name?.toString(),
  };

  return e;
};

export const offerToJson = (form: IOfferForm) => {
  return {
    name: form.name.toString(),
  };
};
