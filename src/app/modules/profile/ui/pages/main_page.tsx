import React from "react";
import { PasswordForm } from "../components/password_form";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { IAsyncData } from "../../../../core/models";
import { IPasswordForm } from "../../data/entities";
import { profileReduxActions } from "../state/state";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../../routes";

interface IProps {}

export const ProfileMainPage: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IPasswordForm): Promise<void> => {
    await dispatch(profileReduxActions.changePassword(values));
    history.push(ROUTES.users);
  };

  const passwordChangeBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.profile.changePassword);

  return (
    <PasswordForm branch={passwordChangeBranch} onSubmit={onSubmit} initialData={null} submitTitle="Change password" />
  );
};
