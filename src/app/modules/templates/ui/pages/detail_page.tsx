import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { IAsyncData } from "../../../../core/models";
import { templateReduxActions } from "../state/state";
import { ITemplate } from "../../data/entities";
import { DetailTable } from "../../../../components/detail_table";
import { ROUTES } from "../../../../routes";
import { Table, TableBody, TableRow, TableCell, Grid } from "@material-ui/core";

export const TemplateDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(templateReduxActions.getDetail(id));
  }, [dispatch, id]);
  const templateDetailBranch = useSelector<IAppReduxState, IAsyncData<ITemplate>>((state) => state.template.details);

  const deleteTemplate = async (id: string): Promise<void> => {
    await dispatch(templateReduxActions.delete(id));
    history.push(ROUTES.templates);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.template.delete);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <DetailTable
          branch={templateDetailBranch}
          route={ROUTES.templates}
          onDelete={deleteTemplate}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell>{templateDetailBranch.data?.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{templateDetailBranch.data?.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
