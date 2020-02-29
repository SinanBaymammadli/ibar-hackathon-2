import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { IBusinessTypeForm } from "../../../businessTypes/data/entities";
import { businessTypeReduxActions } from "../../../businessTypes/ui/state/state";
import { BusinessTypeForm } from "../components/form";

export const BusinessTypeCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IBusinessTypeForm): Promise<void> => {
    await dispatch(businessTypeReduxActions.create(values));
    history.push(ROUTES.businessTypes);
  };

  const createBusinessTypeBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.businessType.create);

  return (
    <BusinessTypeForm branch={createBusinessTypeBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />
  );
};
