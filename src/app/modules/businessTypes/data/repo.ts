import { ApiClient, apiClient } from "../../../core/api_client";
import { ICRUDRepo } from "../../../core/models";
import { generateCrudRepoFactory } from "../../../core/crud";
import { IBusinessType, IBusinessTypeForm, businessTypeFromJson, businessTypeToJson } from "./entities";

interface IBusinessTypeRepo extends ICRUDRepo<IBusinessType, IBusinessTypeForm> {}

const URL = "businessTypes";

const BusinessTypeRepoImplFactory = (apiClient: ApiClient): IBusinessTypeRepo => {
  const r: IBusinessTypeRepo = {
    ...generateCrudRepoFactory<IBusinessType, IBusinessTypeForm>(
      apiClient,
      URL,
      businessTypeFromJson,
      businessTypeToJson,
    ),
  };

  return r;
};

export const BusinessTypeRepoImpl = BusinessTypeRepoImplFactory(apiClient);
