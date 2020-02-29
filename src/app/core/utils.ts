import { BASE_URL } from "./api_client";

export function flattenObject(ob: any): { [x: string]: string } {
  const toReturn: any = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object" && ob[i] !== null) {
      const apartmentTypeObject = flattenObject(ob[i]);
      for (const x in apartmentTypeObject) {
        if (!apartmentTypeObject.hasOwnProperty(x)) continue;

        toReturn[i + " " + x] = apartmentTypeObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

export interface IImage {
  url: string;
  width: number;
  height: number;
}

export function generateImage(json: any): IImage {
  return {
    url: `${BASE_URL}/${json.file?.directory}/${json.file?.name}`,
    width: json.file?.width,
    height: json.file?.height,
  };
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
