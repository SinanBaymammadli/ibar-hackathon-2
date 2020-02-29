import React, { useEffect } from "react";
import { KeyWordsForm } from "../components/key_words_form";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { templateReduxActions } from "../state/state";
import { ROUTES } from "../../../../routes";
import { IAppReduxState } from "../../../../redux/store";
import { IAsyncData } from "../../../../core/models";
import { IKeyWordsForm, IKeyWords } from "../../data/key_words";
import { Routing } from "../../../../core/routing";

interface IProps {}

export const KeyWordsPage: React.FC<IProps> = ({}: IProps) => {
  const match = useRouteMatch<{ id: string }>();
  const { id: templateId } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(templateReduxActions.getKeywords(templateId));
  }, [dispatch, templateId]);
  const keyWordsListBranch = useSelector<IAppReduxState, IAsyncData<IKeyWords>>((state) => state.template.keyWordList);

  const onSubmit = async (values: IKeyWordsForm): Promise<void> => {
    await dispatch(templateReduxActions.editKeywords(templateId, values));
    history.push(Routing.generateDetailRoute(ROUTES.templates, templateId));
  };
  const createTemplateBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.template.create);

  return (
    <KeyWordsForm
      branch={createTemplateBranch}
      onSubmit={onSubmit}
      initialData={keyWordsListBranch}
      submitTitle="Create"
    />
  );
};
