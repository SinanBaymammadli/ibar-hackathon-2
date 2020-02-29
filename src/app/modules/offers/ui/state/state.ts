import { combineReducers } from "redux";
import {
  ICRUDReduxState,
  generateCrudReducers,
  generateCrudActionTypes,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  generateCrudReduxActionCreators,
} from "../../../../core/redux";
import { IOffer, IOfferForm } from "../../data/entities";
import { OfferRepoImpl } from "../../data/repo";

const moduleName = "Offer";

interface IOfferActionTypes extends ICRUDActionTypes {}

const actionTypes: IOfferActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface IOfferActionCreators extends ICrudReduxActionCreators<IOffer, IOfferForm> {}

export const offerReduxActions: IOfferActionCreators = {
  ...generateCrudReduxActionCreators<IOffer, IOfferForm>({ actionTypes, repository: OfferRepoImpl }),
};

export interface IOfferReduxState extends ICRUDReduxState<IOffer> {}

export const OfferReducers = combineReducers<IOfferReduxState>({
  ...generateCrudReducers<IOffer>(actionTypes),
});
