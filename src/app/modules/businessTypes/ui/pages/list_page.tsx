import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import TableCell from "@material-ui/core/TableCell";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { ListTable } from "../../../../components/list_table";
import { CreateButton } from "../../../../components/create_button";
import { businessTypeReduxActions } from "../state/state";
import { IBusinessType } from "../../data/entities";
import { taxTypeTranslation, vatTypeTranslation } from "../../data/utils";

export const BusinessTypeListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(businessTypeReduxActions.getList());
  }, [dispatch]);
  const businessTypeListBranch = useSelector<IAppReduxState, IAsyncData<IBusinessType[]>>(
    (state) => state.businessType.list,
  );

  const deleteBusinessType = async (id: string): Promise<void> => {
    await dispatch(businessTypeReduxActions.delete(id));
    dispatch(businessTypeReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.businessType.delete);

  return (
    <div>
      <CreateButton route={ROUTES.businessTypes} />

      <ListTable<IBusinessType>
        branch={businessTypeListBranch}
        route={ROUTES.businessTypes}
        onDelete={deleteBusinessType}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>Name</TableCell>
            <TableCell>Money limit</TableCell>
            <TableCell>Worker count</TableCell>
            <TableCell>Tax Type</TableCell>
            <TableCell>Vat</TableCell>
          </>
        )}
        renderRow={(businessType) => (
          <>
            <TableCell>{businessType.name}</TableCell>
            <TableCell>{businessType.moneyLimit} AZN</TableCell>
            <TableCell>{businessType.workerCount}</TableCell>
            <TableCell>{taxTypeTranslation(businessType.taxType)}</TableCell>
            <TableCell>{vatTypeTranslation(businessType.vatType)}</TableCell>
          </>
        )}
      />
    </div>
  );
};
