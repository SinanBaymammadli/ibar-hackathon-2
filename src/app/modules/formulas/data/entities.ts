import * as Yup from "yup";

interface IFormulaBase {
  name: string;
}

export interface IFormula extends IFormulaBase {
  id: string;
}

export interface IFormulaForm extends IFormulaBase {}

const formulaCommonValidation = {
  name: Yup.string().required(),
};

export const formulaFormValidation = Yup.object<IFormulaForm>({
  ...formulaCommonValidation,
});

export const formulaEditFormValidation = Yup.object<IFormulaForm>({
  ...formulaCommonValidation,
});

export const formulaFromJson = (json: any): IFormula => {
  const e: IFormula = {
    id: json.id?.toString(),
    name: json.name?.toString(),
  };

  return e;
};

export const formulaToJson = (form: IFormulaForm) => {
  return {
    name: form.name.toString(),
  };
};
