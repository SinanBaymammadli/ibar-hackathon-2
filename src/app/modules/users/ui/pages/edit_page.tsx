import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { UserForm } from "../components/form";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { IUserForm, IUser, userEditFormValidation } from "../../data/entities";
import { userReduxActions } from "../state/state";
import { Routing } from "../../../../core/routing";

export const UserEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const userDetailBranch = useSelector<IAppReduxState, IAsyncData<IUser>>((state) => state.user.details);
  const editUserBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.user.edit);

  useEffect(() => {
    dispatch(userReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IUserForm): Promise<void> => {
    await dispatch(userReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.users, id));
  };

  return (
    <>
      <UserForm
        initialData={userDetailBranch}
        onSubmit={onSubmit}
        branch={editUserBranch}
        validationSchema={userEditFormValidation}
        submitTitle="Edit"
      />
    </>
  );
};
