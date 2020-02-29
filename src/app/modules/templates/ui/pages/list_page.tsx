import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import TableCell from "@material-ui/core/TableCell";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { templateReduxActions } from "../state/state";
import { ITemplate, EPeriod } from "../../data/entities";
import { ListTable } from "../../../../components/list_table";
import { CreateButton } from "../../../../components/create_button";

export const TemplateListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(templateReduxActions.getList());
  }, [dispatch]);
  const templateListBranch = useSelector<IAppReduxState, IAsyncData<ITemplate[]>>((state) => state.template.list);

  const deleteTemplate = async (id: string): Promise<void> => {
    await dispatch(templateReduxActions.delete(id));
    dispatch(templateReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.template.delete);

  return (
    <div>
      <CreateButton route={ROUTES.templates} />

      <ListTable<ITemplate>
        branch={templateListBranch}
        route={ROUTES.templates}
        onDelete={deleteTemplate}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>Name</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Name</TableCell>
          </>
        )}
        renderRow={(template) => (
          <>
            <TableCell>{template.name}</TableCell>
            <TableCell>{EPeriod[template.period]}</TableCell>
            <TableCell>{template.businessTypeId}</TableCell>
          </>
        )}
      />
    </div>
  );
};
