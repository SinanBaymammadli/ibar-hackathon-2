import * as Yup from "yup";

interface IKeyWordBase {
  name: string;
  formulaId: string;
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
  formulaId: Yup.string().required(),
};

export const keyWordsFormValidation = Yup.object<IKeyWordsForm>({
  keywords: Yup.array(Yup.object(keyWordsCommonValidation)),
});

export const keyWordsEditFormValidation = Yup.object<IKeyWordsForm>({
  keywords: Yup.array(Yup.object(keyWordsCommonValidation)),
});

export const KeyWordsFromJson = (json: any): IKeyWords => {
  const e: IKeyWords = {
    id: json.id?.toString(),
    keywords: json.keywords.map((j: any) => ({
      name: j.name,
      formulaId: j.formulaId,
    })),
  };

  return e;
};

export const KeyWordsToJson = (form: IKeyWordsForm) => {
  return {
    keywords: form.keywords,
  };
};
