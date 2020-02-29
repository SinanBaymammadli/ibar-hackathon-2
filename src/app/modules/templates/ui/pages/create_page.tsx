import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { TemplateForm } from "../components/form";
import { IAsyncData } from "../../../../core/models";
import { templateReduxActions } from "../state/state";
import { ITemplateForm } from "../../data/entities";

export const TemplateCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: ITemplateForm): Promise<void> => {
    await dispatch(templateReduxActions.create(values));
    history.push(ROUTES.templates);
  };

  const createTemplateBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.template.create);

  return <TemplateForm branch={createTemplateBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
