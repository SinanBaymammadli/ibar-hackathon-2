import { ApiClient, apiClient } from "../../../core/api_client";
import { ICRUDRepo } from "../../../core/models";
import { IOffer, IOfferForm, offerFromJson, offerToJson } from "./entities";
import { generateCrudRepoFactory } from "../../../core/crud";

interface IOfferRepo extends ICRUDRepo<IOffer, IOfferForm> {}

const URL = "offers";

const OfferRepoImplFactory = (apiClient: ApiClient): IOfferRepo => {
  const r: IOfferRepo = {
    ...generateCrudRepoFactory<IOffer, IOfferForm>(apiClient, URL, offerFromJson, offerToJson),
  };

  return r;
};

export const OfferRepoImpl = OfferRepoImplFactory(apiClient);
