import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { FormulaForm } from "../components/form";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { IFormulaForm, IFormula, formulaEditFormValidation } from "../../data/entities";
import { formulaReduxActions } from "../state/state";
import { Routing } from "../../../../core/routing";

export const FormulaEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const formulaDetailBranch = useSelector<IAppReduxState, IAsyncData<IFormula>>((state) => state.formula.details);
  const editFormulaBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.formula.edit);

  useEffect(() => {
    dispatch(formulaReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IFormulaForm): Promise<void> => {
    await dispatch(formulaReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.formulas, id));
  };

  return (
    <>
      <FormulaForm
        initialData={formulaDetailBranch}
        onSubmit={onSubmit}
        branch={editFormulaBranch}
        validationSchema={formulaEditFormValidation}
        submitTitle="Edit"
      />
    </>
  );
};
