import { combineReducers } from "redux";
import {
  ICRUDReduxState,
  generateCrudReducers,
  generateCrudActionTypes,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  generateCrudReduxActionCreators,
} from "../../../../core/redux";
import { IFormula, IFormulaForm } from "../../data/entities";
import { FormulaRepoImpl } from "../../data/repo";

const moduleName = "Formula";

interface IFormulaActionTypes extends ICRUDActionTypes {}

const actionTypes: IFormulaActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface IFormulaActionCreators extends ICrudReduxActionCreators<IFormula, IFormulaForm> {}

export const formulaReduxActions: IFormulaActionCreators = {
  ...generateCrudReduxActionCreators<IFormula, IFormulaForm>({ actionTypes, repository: FormulaRepoImpl }),
};

export interface IFormulaReduxState extends ICRUDReduxState<IFormula> {}

export const FormulaReducers = combineReducers<IFormulaReduxState>({
  ...generateCrudReducers<IFormula>(actionTypes),
});
