import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { OfferForm } from "../components/form";
import { IAsyncData } from "../../../../core/models";
import { offerReduxActions } from "../state/state";
import { IOfferForm } from "../../data/entities";

export const OfferCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IOfferForm): Promise<void> => {
    await dispatch(offerReduxActions.create(values));
    history.push(ROUTES.offers);
  };

  const createOfferBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.offer.create);

  return <OfferForm branch={createOfferBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
