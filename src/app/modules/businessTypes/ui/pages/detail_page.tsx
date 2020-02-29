import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { IAsyncData } from "../../../../core/models";
import { DetailTable } from "../../../../components/detail_table";
import { ROUTES } from "../../../../routes";
import { Table, TableBody, TableRow, TableCell, Grid } from "@material-ui/core";
import { IBusinessType } from "../../data/entities";
import { businessTypeReduxActions } from "../state/state";
import { taxTypeTranslation, vatTypeTranslation } from "../../data/utils";
import { EActivityCategory } from "../../../offers/data/entities";

export const BusinessTypeDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(businessTypeReduxActions.getDetail(id));
  }, [dispatch, id]);
  const BusinessTypeDetailBranch = useSelector<IAppReduxState, IAsyncData<IBusinessType>>(
    (state) => state.businessType.details,
  );

  const deleteBusinessType = async (id: string): Promise<void> => {
    await dispatch(businessTypeReduxActions.delete(id));
    history.push(ROUTES.businessTypes);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.businessType.delete);
  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <DetailTable
          branch={BusinessTypeDetailBranch}
          route={ROUTES.businessTypes}
          onDelete={deleteBusinessType}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{BusinessTypeDetailBranch.data?.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Worker count</TableCell>
                <TableCell>{BusinessTypeDetailBranch.data?.workerCount}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Money limit</TableCell>
                <TableCell>{BusinessTypeDetailBranch.data?.moneyLimit} AZN</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>
                  {BusinessTypeDetailBranch.data?.category !== undefined
                    ? EActivityCategory[BusinessTypeDetailBranch.data?.category]
                    : ""}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Tax type</TableCell>
                <TableCell>
                  {BusinessTypeDetailBranch.data?.taxType !== undefined
                    ? taxTypeTranslation(BusinessTypeDetailBranch.data?.taxType)
                    : ""}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Vat</TableCell>
                <TableCell>
                  {BusinessTypeDetailBranch.data?.vatType !== undefined
                    ? vatTypeTranslation(BusinessTypeDetailBranch.data?.vatType)
                    : ""}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
