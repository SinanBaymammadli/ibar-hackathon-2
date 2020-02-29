import React, { useEffect } from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps, IAsyncData } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";
import { IKeyWordsForm, keyWordsFormValidation } from "../../data/key_words";
import { IFormula } from "../../../formulas/data/entities";
import { SelectInput } from "../../../../components/select_input";
import { formulaReduxActions } from "../../../formulas/ui/state/state";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";

interface IProps extends IFormProps<IKeyWordsForm> {}

export const KeyWordsForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(formulaReduxActions.getList());
  }, [dispatch]);
  const formulaListBranch = useSelector<IAppReduxState, IAsyncData<IFormula[]>>((state) => state.formula.list);

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={6}>
        <Form<IKeyWordsForm>
          {...props}
          initialValues={{
            keywords: [],
          }}
          validationSchema={keyWordsFormValidation}
        >
          {({ values }) => (
            <>
              {values.keywords.map((keyword, index) => {
                return (
                  <Grid key={index} container spacing={2}>
                    <Grid item xs={6}>
                      <TextInput label="Name" name={`keywords.${index}.name`} />
                    </Grid>
                    <Grid item xs={6}>
                      <SelectInput<IFormula>
                        value={keyword.formulaId}
                        options={formulaListBranch}
                        name={`keywords.${index}.formulaId`}
                        label="Formula"
                        renderLabel={(a) => a.name}
                      />
                    </Grid>
                  </Grid>
                );
              })}

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
