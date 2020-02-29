import { ApiClient, apiClient } from "../../../core/api_client";
import { ICRUDRepo } from "../../../core/models";
import { ITemplate, ITemplateForm, templateFromJson, templateToJson } from "./entities";
import { generateCrudRepoFactory } from "../../../core/crud";
import { IKeyWords, IKeyWordsForm } from "./key_words";
import { Failure } from "../../../core/failure";

interface ITemplateRepo extends ICRUDRepo<ITemplate, ITemplateForm> {
  getKeywords: (templateId: string) => Promise<IKeyWords>;
  editKeywords: (templateId: string, keywords: IKeyWordsForm) => Promise<void>;
}

const URL = "TaxReportTemplates";

const TemplateRepoImplFactory = (apiClient: ApiClient): ITemplateRepo => {
  const r: ITemplateRepo = {
    ...generateCrudRepoFactory<ITemplate, ITemplateForm>(apiClient, URL, templateFromJson, templateToJson),
    getKeywords: async (templateId) => {
      try {
        const res = await apiClient.get(`/${URL}/KeyWords/${templateId}`);
        return {
          id: templateId,
          keywords: Object.keys(res.data).map((key) => ({
            name: key,
            value: res.data[key],
          })),
        };
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
    editKeywords: async (id, form) => {
      try {
        await apiClient.put(
          `/${URL}/${id}`,
          form.keywords.reduce(
            (curr, keyword) => ({
              ...curr,
              [keyword.name]: keyword.value,
            }),
            {},
          ),
        );
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
  };

  return r;
};

export const TemplateRepoImpl = TemplateRepoImplFactory(apiClient);
