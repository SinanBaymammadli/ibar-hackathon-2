import { ApiClient, apiClient } from "../../../core/api_client";
import { ICRUDRepo } from "../../../core/models";
import { ITemplate, ITemplateForm, templateFromJson, templateToJson } from "./entities";
import { generateCrudRepoFactory } from "../../../core/crud";

interface ITemplateRepo extends ICRUDRepo<ITemplate, ITemplateForm> {}

const URL = "templates";

const TemplateRepoImplFactory = (apiClient: ApiClient): ITemplateRepo => {
  const r: ITemplateRepo = {
    ...generateCrudRepoFactory<ITemplate, ITemplateForm>(apiClient, URL, templateFromJson, templateToJson),
  };

  return r;
};

export const TemplateRepoImpl = TemplateRepoImplFactory(apiClient);
