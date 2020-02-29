import React from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";
import { IKeyWordsForm, keyWordsFormValidation } from "../../data/key_words";

interface IProps extends IFormProps<IKeyWordsForm> {}

export const KeyWordsForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

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
                      <TextInput label="Value" name={`keywords.${index}.value`} />
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
