import { combineReducers } from "redux";
import { IAsyncData } from "../../../../core/models";
import { IAsyncReduxAction, asyncItemReducerGenerator } from "../../../../core/redux";
import { ProfileRepoImpl } from "../../data/repo";
import { IPasswordForm } from "../../data/entities";

enum EProfileActionType {
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

interface IProfileActionCreators {
  changePassword: (form: IPasswordForm) => IAsyncReduxAction<void>;
}

export const profileReduxActions: IProfileActionCreators = {
  changePassword: (form) => ({
    type: EProfileActionType.CHANGE_PASSWORD,
    payload: ProfileRepoImpl.changePassword(form),
  }),
};

export interface IProfileReduxState {
  changePassword: IAsyncData<void>;
}

export const ProfileReducers = combineReducers<IProfileReduxState>({
  changePassword: asyncItemReducerGenerator<void>(EProfileActionType.CHANGE_PASSWORD),
});
