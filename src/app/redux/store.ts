import thunk, { ThunkDispatch } from "redux-thunk";
import { createStore, applyMiddleware, combineReducers, Reducer, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reduxPromiseMiddleware, confirmationMiddleware } from "./middlewares";
import { IAuthenticationReduxState, AuthenticationReducers } from "../modules/auth/ui/state/state";
import { UserReducers, IUserReduxState } from "../modules/users/ui/state/state";
import { IProfileReduxState, ProfileReducers } from "../modules/profile/ui/state/state";
import { ITemplateReduxState, TemplateReducers } from "../modules/templates/ui/state/state";
import { IFormulaReduxState, FormulaReducers } from "../modules/formulas/ui/state/state";
import { businessTypeReducers, IBusinessTypeReduxState } from "../modules/businessTypes/ui/state/state";
import { IOfferReduxState, OfferReducers } from "../modules/offers/ui/state/state";

export interface IAppReduxState {
  auth: IAuthenticationReduxState;
  user: IUserReduxState;
  profile: IProfileReduxState;
  template: ITemplateReduxState;
  formula: IFormulaReduxState;
  businessType: IBusinessTypeReduxState;
  offer: IOfferReduxState;
}

export function getRootReducer(): Reducer<IAppReduxState> {
  const reducersList = {
    auth: AuthenticationReducers,
    user: UserReducers,
    profile: ProfileReducers,
    template: TemplateReducers,
    formula: FormulaReducers,
    businessType: businessTypeReducers,
    offer: OfferReducers,
  };

  return combineReducers<IAppReduxState>(reducersList);
}

export const store = createStore(
  getRootReducer(),
  composeWithDevTools(applyMiddleware(thunk, reduxPromiseMiddleware, confirmationMiddleware)),
);

export type ReduxDispatch = ThunkDispatch<IAppReduxState, any, Action>;
