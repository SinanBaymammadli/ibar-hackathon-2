import * as Yup from "yup";

interface IKeyWordBase {
  name: string;
  value: string;
}

interface IKeyWordsBase {
  keywords: IKeyWordBase[];
}

export interface IKeyWords extends IKeyWordsBase {
  id: string;
}

export interface IKeyWordsForm extends IKeyWordsBase {}

const keyWordsCommonValidation = {
  name: Yup.string().required(),
  value: Yup.string().required(),
};

export const keyWordsFormValidation = Yup.object<IKeyWordsForm>({
  keywords: Yup.array(Yup.object(keyWordsCommonValidation)),
});

export const keyWordsEditFormValidation = Yup.object<IKeyWordsForm>({
  keywords: Yup.array(Yup.object(keyWordsCommonValidation)),
});

export const keyWordsFromJson = (json: any): IKeyWords => {
  const e: IKeyWords = {
    id: json.id?.toString(),
    keywords: json.keywords.map((j: any) => ({
      name: j.name,
      value: j.value,
    })),
  };

  return e;
};

export const keyWordsToJson = (form: IKeyWordsForm) => {
  return {
    keywords: form.keywords,
  };
};
