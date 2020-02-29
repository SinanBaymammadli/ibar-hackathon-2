import * as Yup from "yup";

export enum EActivityCategory {
  Agriculture,
  MiningIndustry,
  ProcessingIndustry,
  PowerSupply,
  WaterSupply,
  Construction,
  WholeSaleAndRetailtTrade,
  Transport,
  Accomadation,
  ICT,
  AccountingAndInsurance,
  RealEstate,
  ScientificActivities,
  AdministrativeSupportservices,
  PublicAdminstration,
  Education,
  ProvisionOfHealth,
  EntertaimentAndArt,
  OtherProvideAreas,
  HouseHoldActivities,
  ImmunityRightOrganizations,
}

interface IOfferBase {
  minCashFlow: number;
  minRating: number;
  activityCategoryId: EActivityCategory;
}

export interface IOffer extends IOfferBase {
  id: string;
}

export interface IOfferForm extends IOfferBase {}

const offerCommonValidation = {
  minCashFlow: Yup.number().required(),
  minRating: Yup.number().required(),
  activityCategoryId: Yup.mixed<EActivityCategory>().required(),
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
    minCashFlow: json.minCashFlow,
    minRating: json.minRating,
    activityCategoryId: json.activityCategoryId,
  };

  return e;
};

export const offerToJson = (form: IOfferForm) => {
  return {
    minCashFlow: form.minCashFlow,
    minRating: form.minRating,
    activityCategoryId: form.activityCategoryId.toString(),
  };
};
