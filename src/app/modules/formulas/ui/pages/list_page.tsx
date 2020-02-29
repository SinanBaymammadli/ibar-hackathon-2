import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import TableCell from "@material-ui/core/TableCell";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { formulaReduxActions } from "../state/state";
import { IFormula } from "../../data/entities";
import { ListTable } from "../../../../components/list_table";
import { CreateButton } from "../../../../components/create_button";

export const FormulaListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(formulaReduxActions.getList());
  }, [dispatch]);
  const formulaListBranch = useSelector<IAppReduxState, IAsyncData<IFormula[]>>((state) => state.formula.list);

  const deleteFormula = async (id: string): Promise<void> => {
    await dispatch(formulaReduxActions.delete(id));
    dispatch(formulaReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.formula.delete);

  return (
    <div>
      <CreateButton route={ROUTES.formulas} />

      <ListTable<IFormula>
        branch={formulaListBranch}
        route={ROUTES.formulas}
        onDelete={deleteFormula}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>Name</TableCell>
          </>
        )}
        renderRow={(formula) => (
          <>
            <TableCell>{formula.name}</TableCell>
          </>
        )}
      />
    </div>
  );
};
