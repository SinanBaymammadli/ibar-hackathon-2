import React from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { templateFormValidation, ITemplateForm } from "../../data/entities";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";

interface IProps extends IFormProps<ITemplateForm> {}

export const TemplateForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <Form<ITemplateForm>
          {...props}
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={templateFormValidation}
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
