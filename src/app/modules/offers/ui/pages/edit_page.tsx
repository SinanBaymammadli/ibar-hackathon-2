import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { OfferForm } from "../components/form";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { IOfferForm, IOffer, offerEditFormValidation } from "../../data/entities";
import { offerReduxActions } from "../state/state";
import { Routing } from "../../../../core/routing";

export const OfferEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const offerDetailBranch = useSelector<IAppReduxState, IAsyncData<IOffer>>((state) => state.offer.details);
  const editOfferBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.offer.edit);

  useEffect(() => {
    dispatch(offerReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IOfferForm): Promise<void> => {
    await dispatch(offerReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.offers, id));
  };

  return (
    <>
      <OfferForm
        initialData={offerDetailBranch}
        onSubmit={onSubmit}
        branch={editOfferBranch}
        validationSchema={offerEditFormValidation}
        submitTitle="Edit"
      />
    </>
  );
};
