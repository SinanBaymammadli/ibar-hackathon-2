import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { IAsyncData } from "../../../../core/models";
import { offerReduxActions } from "../state/state";
import { IOffer } from "../../data/entities";
import { DetailTable } from "../../../../components/detail_table";
import { ROUTES } from "../../../../routes";
import { Table, TableBody, TableRow, TableCell, Grid } from "@material-ui/core";

export const OfferDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(offerReduxActions.getDetail(id));
  }, [dispatch, id]);
  const offerDetailBranch = useSelector<IAppReduxState, IAsyncData<IOffer>>((state) => state.offer.details);

  const deleteOffer = async (id: string): Promise<void> => {
    await dispatch(offerReduxActions.delete(id));
    history.push(ROUTES.offers);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.offer.delete);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <DetailTable
          branch={offerDetailBranch}
          route={ROUTES.offers}
          onDelete={deleteOffer}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell>{offerDetailBranch.data?.name}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
