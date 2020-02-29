import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { FormulaForm } from "../components/form";
import { IAsyncData } from "../../../../core/models";
import { formulaReduxActions } from "../state/state";
import { IFormulaForm } from "../../data/entities";

export const FormulaCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IFormulaForm): Promise<void> => {
    await dispatch(formulaReduxActions.create(values));
    history.push(ROUTES.formulas);
  };

  const createFormulaBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.formula.create);

  return <FormulaForm branch={createFormulaBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
