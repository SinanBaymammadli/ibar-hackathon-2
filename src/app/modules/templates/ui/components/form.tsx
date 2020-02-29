import React from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { templateFormValidation, ITemplateForm } from "../../data/entities";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";
import { FileInput } from "../../../../components/file_input";

interface IProps extends IFormProps<ITemplateForm> {}

export const TemplateForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={6}>
        <Form<ITemplateForm>
          {...props}
          initialValues={{
            name: "",
            file: undefined,
          }}
          validationSchema={templateFormValidation}
        >
          {({ setFieldValue }) => (
            <>
              <TextInput label="Name" name="name" />

              <FileInput label="Image" name="file" setFieldValue={setFieldValue} />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
