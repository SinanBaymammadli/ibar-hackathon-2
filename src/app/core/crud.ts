import { ApiClient } from "./api_client";
import { ICRUDRepo } from "./models";
import { Failure } from "./failure";
import { objectToFormData } from "object-to-formdata";
import { sleep } from "./utils";

export function generateCrudRepoFactory<T, TForm>(
  apiClient: ApiClient,
  url: string,
  fromJson: (json: any) => T,
  toJson: (form: TForm) => any,
  hasFile = false,
): ICRUDRepo<T, TForm> {
  const r: ICRUDRepo<T, TForm> = {
    getList: async () => {
      try {
        const res = await apiClient.get(`/${url}`);
        return res.data.map(fromJson);
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
    getDetails: async (id: string) => {
      try {
        const res = await apiClient.get(`/${url}/${id}`);
        return fromJson(res.data);
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
    create: async (form) => {
      const json = toJson(form);
      const data = hasFile ? objectToFormData(json, { indices: true }) : json;

      try {
        await sleep(1000);
        const res = await apiClient.post(`/${url}`, data, {
          headers: {
            "Content-Type": hasFile ? "multipart/form-data" : "application/json",
          },
        });
        return res.data;
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
    edit: async (id, form) => {
      const data = hasFile ? objectToFormData(toJson(form), { indices: true }) : toJson(form);

      try {
        await apiClient.put(`/${url}/${id}`, data, {
          headers: {
            "Content-Type": hasFile ? "multipart/form-data" : "application/json",
          },
        });
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
    delete: async (id) => {
      try {
        await apiClient.delete(`/${url}/${id}`);
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };
        throw failure;
      }
    },
  };

  return r;
}
