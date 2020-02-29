import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { TemplateForm } from "../components/form";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { ITemplateForm, ITemplate, templateEditFormValidation } from "../../data/entities";
import { templateReduxActions } from "../state/state";
import { Routing } from "../../../../core/routing";

export const TemplateEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const templateDetailBranch = useSelector<IAppReduxState, IAsyncData<ITemplate>>((state) => state.template.details);
  const editTemplateBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.template.edit);

  useEffect(() => {
    dispatch(templateReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: ITemplateForm): Promise<void> => {
    await dispatch(templateReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.templates, id));
  };

  return (
    <>
      <TemplateForm
        initialData={templateDetailBranch}
        onSubmit={onSubmit}
        branch={editTemplateBranch}
        validationSchema={templateEditFormValidation}
        submitTitle="Edit"
      />
    </>
  );
};
