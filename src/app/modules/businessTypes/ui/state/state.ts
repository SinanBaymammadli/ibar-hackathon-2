import { combineReducers } from "redux";
import {
  ICRUDReduxState,
  generateCrudReducers,
  generateCrudActionTypes,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  generateCrudReduxActionCreators,
} from "../../../../core/redux";
import { IBusinessType, IBusinessTypeForm } from "../../data/entities";
import { BusinessTypeRepoImpl } from "../../data/repo";

const moduleName = "BusinessType";

interface IBusinessTypeActionTypes extends ICRUDActionTypes {}

const actionTypes: IBusinessTypeActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface IBusinessTypeActionCreators extends ICrudReduxActionCreators<IBusinessType, IBusinessTypeForm> {}

export const businessTypeReduxActions: IBusinessTypeActionCreators = {
  ...generateCrudReduxActionCreators<IBusinessType, IBusinessTypeForm>({
    actionTypes,
    repository: BusinessTypeRepoImpl,
  }),
};

export interface IBusinessTypeReduxState extends ICRUDReduxState<IBusinessType> {}

export const businessTypeReducers = combineReducers<IBusinessTypeReduxState>({
  ...generateCrudReducers<IBusinessType>(actionTypes),
});
