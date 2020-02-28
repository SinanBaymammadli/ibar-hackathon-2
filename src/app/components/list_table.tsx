import React from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import { Routing } from "../core/routing";
import { useHistory } from "react-router-dom";
import { ErrorPanel } from "./error_panel";
import { isSuccess, isError, isPending } from "../core/redux";
import { Center } from "./center";
import { IAsyncData } from "../core/models";
import { Loading } from "./loading";
import { ActionTableCell } from "./action_table_cell";

interface IProps<T> {
  branch: IAsyncData<T[]>;
  route?: string;
  canEdit?: boolean;
  renderHeader: () => React.ReactNode;
  renderSummary?: () => React.ReactNode;
  renderRow: (d: T) => React.ReactNode;
  onDelete?: (id: string) => void;
  deleteBranch?: IAsyncData<void>;
}

export function ListTable<T extends { id: string }>({
  branch,
  renderHeader,
  renderRow,
  route,
  onDelete,
  deleteBranch,
  renderSummary,
  canEdit,
}: IProps<T>) {
  const history = useHistory();
  const isDeletePending = Boolean(deleteBranch && isPending(deleteBranch));

  return (
    <Loading loading={isPending(branch) || isDeletePending}>
      <Paper>
        <Table size="medium" className="list-table">
          <TableHead>
            <TableRow>
              <TableCell align="left">No</TableCell>
              {renderHeader()}
              <TableCell align="right" style={{ width: 105 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>{renderSummary && renderSummary()}</TableRow>
            {branch.data?.map((data) => (
              <TableRow
                hover
                key={data.id}
                onClick={() => {
                  route && history.push(Routing.generateDetailRoute(route, data.id));
                }}
              >
                <TableCell component="th" scope="row">
                  {data.id}
                </TableCell>
                {renderRow(data)}
                <ActionTableCell onDelete={onDelete} id={data.id} route={canEdit ? route : ""} />
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isError(branch) && (
          <Center>
            <Box py={3}>
              <ErrorPanel branch={branch} />
            </Box>
          </Center>
        )}

        {isSuccess(branch) && branch.data?.length === 0 && (
          <Center>
            <Box py={3}>
              <Typography>No item</Typography>
            </Box>
          </Center>
        )}
      </Paper>
    </Loading>
  );
}
