import { combineReducers } from "redux";
import { IAsyncData } from "../../../../core/models";
import { IAsyncReduxAction, asyncItemReducerGenerator } from "../../../../core/redux";
import { AuthRepoImpl } from "../../data/repo";
import { ILoginForm } from "../../data/entites";

enum EAuthenticationActionType {
  IS_LOGGED_IN = "IS_LOGGED_IN",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

interface IAuthenticationActionCreators {
  checkAuth: () => IAsyncReduxAction<boolean>;
  login: (param: ILoginForm) => IAsyncReduxAction<void>;
  logout: () => IAsyncReduxAction<void>;
}

export const authReduxActions: IAuthenticationActionCreators = {
  checkAuth: (): IAsyncReduxAction<boolean> => ({
    type: EAuthenticationActionType.IS_LOGGED_IN,
    payload: AuthRepoImpl.isLoggedIn(),
  }),
  login: (param: ILoginForm): IAsyncReduxAction<void> => ({
    type: EAuthenticationActionType.LOGIN,
    payload: AuthRepoImpl.login(param),
  }),
  logout: (): IAsyncReduxAction<void> => ({
    type: EAuthenticationActionType.LOGOUT,
    payload: AuthRepoImpl.logout(),
  }),
};

export interface IAuthenticationReduxState {
  isLoggedIn: IAsyncData<boolean>;
  login: IAsyncData<void>;
  logout: IAsyncData<void>;
}

export const AuthenticationReducers = combineReducers<IAuthenticationReduxState>({
  isLoggedIn: asyncItemReducerGenerator<boolean>(EAuthenticationActionType.IS_LOGGED_IN),
  login: asyncItemReducerGenerator<void>(EAuthenticationActionType.LOGIN),
  logout: asyncItemReducerGenerator<void>(EAuthenticationActionType.LOGOUT),
});
