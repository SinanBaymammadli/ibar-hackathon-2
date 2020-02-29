import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { Routing } from "../../../../core/routing";
import { IBusinessType, IBusinessTypeForm, businessTypeEditFormValidation } from "../../../businessTypes/data/entities";
import { businessTypeReduxActions } from "../../../businessTypes/ui/state/state";
import { BusinessTypeForm } from "../components/form";

export const BusinessTypeEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const businessTypeDetailBranch = useSelector<IAppReduxState, IAsyncData<IBusinessType>>(
    (state) => state.businessType.details,
  );
  const editBusinessTypeBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.businessType.edit);

  useEffect(() => {
    dispatch(businessTypeReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IBusinessTypeForm): Promise<void> => {
    await dispatch(businessTypeReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.businessTypes, id));
  };

  return (
    <>
      <BusinessTypeForm
        initialData={businessTypeDetailBranch}
        onSubmit={onSubmit}
        branch={editBusinessTypeBranch}
        validationSchema={businessTypeEditFormValidation}
        submitTitle="Edit"
      />
    </>
  );
};
