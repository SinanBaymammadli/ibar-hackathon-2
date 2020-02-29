import { combineReducers } from "redux";
import {
  ICRUDReduxState,
  generateCrudReducers,
  generateCrudActionTypes,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  generateCrudReduxActionCreators,
} from "../../../../core/redux";
import { ITemplate, ITemplateForm } from "../../data/entities";
import { TemplateRepoImpl } from "../../data/repo";

const moduleName = "Template";

interface ITemplateActionTypes extends ICRUDActionTypes {}

const actionTypes: ITemplateActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface ITemplateActionCreators extends ICrudReduxActionCreators<ITemplate, ITemplateForm> {}

export const templateReduxActions: ITemplateActionCreators = {
  ...generateCrudReduxActionCreators<ITemplate, ITemplateForm>({ actionTypes, repository: TemplateRepoImpl }),
};

export interface ITemplateReduxState extends ICRUDReduxState<ITemplate> {}

export const TemplateReducers = combineReducers<ITemplateReduxState>({
  ...generateCrudReducers<ITemplate>(actionTypes),
});
