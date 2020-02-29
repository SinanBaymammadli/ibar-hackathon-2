import { combineReducers } from "redux";
import {
  ICRUDReduxState,
  generateCrudReducers,
  generateCrudActionTypes,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  generateCrudReduxActionCreators,
  IAsyncReduxAction,
  asyncItemReducerGenerator,
} from "../../../../core/redux";
import { ITemplate, ITemplateForm } from "../../data/entities";
import { TemplateRepoImpl } from "../../data/repo";
import { IKeyWords, IKeyWordsForm } from "../../data/key_words";
import { IAsyncData } from "../../../../core/models";

const moduleName = "Template";

interface ITemplateActionTypes extends ICRUDActionTypes {
  getKeywords: string;
  editKeyWords: string;
}

const actionTypes: ITemplateActionTypes = {
  ...generateCrudActionTypes(moduleName),
  getKeywords: `GET_${moduleName}_KEYWORDS_LIST`,
  editKeyWords: `EDIT_${moduleName}_KEYWORDS_LIST`,
};

interface ITemplateActionCreators extends ICrudReduxActionCreators<ITemplate, ITemplateForm> {
  getKeywords: (templateId: string) => IAsyncReduxAction<IKeyWords>;
  editKeywords: (templateId: string, form: IKeyWordsForm) => IAsyncReduxAction<void>;
}

export const templateReduxActions: ITemplateActionCreators = {
  ...generateCrudReduxActionCreators<ITemplate, ITemplateForm>({ actionTypes, repository: TemplateRepoImpl }),
  getKeywords: (templateId) => ({
    type: actionTypes.getKeywords,
    payload: TemplateRepoImpl.getKeywords(templateId),
  }),
  editKeywords: (templateId, form) => ({
    type: actionTypes.editKeyWords,
    payload: TemplateRepoImpl.editKeywords(templateId, form),
  }),
};

export interface ITemplateReduxState extends ICRUDReduxState<ITemplate> {
  keyWordList: IAsyncData<IKeyWords>;
  editKeywords: IAsyncData<void>;
}

export const TemplateReducers = combineReducers<ITemplateReduxState>({
  ...generateCrudReducers<ITemplate>(actionTypes),
  keyWordList: asyncItemReducerGenerator<IKeyWords>(actionTypes.getKeywords),
  editKeywords: asyncItemReducerGenerator<void>(actionTypes.editKeyWords),
});
