import React from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { formulaFormValidation, IFormulaForm } from "../../data/entities";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";

interface IProps extends IFormProps<IFormulaForm> {}

export const FormulaForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <Form<IFormulaForm>
          {...props}
          initialValues={{
            name: "",
          }}
          validationSchema={formulaFormValidation}
        >
          {() => (
            <>
              <TextInput label="Name" name="name" />
              <TextInput label="Email" name="email" type="email" />
              <TextInput label="Password" name="password" type="password" />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};