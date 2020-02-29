import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import TableCell from "@material-ui/core/TableCell";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { offerReduxActions } from "../state/state";
import { IOffer, EActivityCategory } from "../../data/entities";
import { ListTable } from "../../../../components/list_table";
import { CreateButton } from "../../../../components/create_button";

export const OfferListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(offerReduxActions.getList());
  }, [dispatch]);
  const offerListBranch = useSelector<IAppReduxState, IAsyncData<IOffer[]>>((state) => state.offer.list);

  const deleteOffer = async (id: string): Promise<void> => {
    await dispatch(offerReduxActions.delete(id));
    dispatch(offerReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.offer.delete);

  return (
    <div>
      <CreateButton route={ROUTES.offers} />

      <ListTable<IOffer>
        branch={offerListBranch}
        route={ROUTES.offers}
        onDelete={deleteOffer}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>Min cash flow</TableCell>
            <TableCell>Min rating</TableCell>
            <TableCell>Category</TableCell>
          </>
        )}
        renderRow={(offer) => (
          <>
            <TableCell>{offer.minCashFlow} AZN</TableCell>
            <TableCell>{offer.minRating}</TableCell>
            <TableCell>{EActivityCategory[offer.activityCategoryId]}</TableCell>
          </>
        )}
      />
    </div>
  );
};
