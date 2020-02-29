import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { IAsyncData } from "../../../../core/models";
import { formulaReduxActions } from "../state/state";
import { IFormula } from "../../data/entities";
import { DetailTable } from "../../../../components/detail_table";
import { ROUTES } from "../../../../routes";
import { Table, TableBody, TableRow, TableCell, Grid } from "@material-ui/core";

export const FormulaDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(formulaReduxActions.getDetail(id));
  }, [dispatch, id]);
  const formulaDetailBranch = useSelector<IAppReduxState, IAsyncData<IFormula>>((state) => state.formula.details);

  const deleteFormula = async (id: string): Promise<void> => {
    await dispatch(formulaReduxActions.delete(id));
    history.push(ROUTES.formulas);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.formula.delete);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <DetailTable
          branch={formulaDetailBranch}
          route={ROUTES.formulas}
          onDelete={deleteFormula}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell>{formulaDetailBranch.data?.name}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
