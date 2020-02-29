import React from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";
import { IBusinessTypeForm, businessTypeFormValidation } from "../../data/entities";

interface IProps extends IFormProps<IBusinessTypeForm> {}

export const BusinessTypeForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <Form<IBusinessTypeForm>
          {...props}
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={businessTypeFormValidation}
        >
          {() => (
            <>
              <TextInput label="Name" name="name" />
              <TextInput label="Email" name="email" type="email" />
              <TextInput label="Password" name="password" type="password" />

              {/* <CheckboxInput label="Active" name="isActive" /> */}

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
