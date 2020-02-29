import { ApiClient, apiClient } from "../../../core/api_client";
import { ICRUDRepo } from "../../../core/models";
import { IFormula, IFormulaForm, formulaFromJson, formulaToJson } from "./entities";
import { generateCrudRepoFactory } from "../../../core/crud";

interface IFormulaRepo extends ICRUDRepo<IFormula, IFormulaForm> {}

const URL = "formulas";

const FormulaRepoImplFactory = (apiClient: ApiClient): IFormulaRepo => {
  const r: IFormulaRepo = {
    ...generateCrudRepoFactory<IFormula, IFormulaForm>(apiClient, URL, formulaFromJson, formulaToJson),
  };

  return r;
};

export const FormulaRepoImpl = FormulaRepoImplFactory(apiClient);
