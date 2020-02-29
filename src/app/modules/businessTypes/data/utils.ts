import { ETaxType } from "./entities";

export function taxTypeTranslation(taxType: ETaxType) {
  let translate = "";

  if (taxType === 0) {
    translate = "Simplified Tax";
  } else if (taxType === 1) {
    translate = "Income Tax";
  }

  return translate;
}

export function vatTypeTranslation(vatType: boolean) {
  let translate = "";

  if (vatType) {
    translate = "Includes VAT";
  } else {
    translate = "VAT is not included";
  }

  return translate;
}
