import React from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";
import { IBusinessTypeForm, businessTypeFormValidation, ETaxType } from "../../data/entities";
import { SelectInput } from "../../../../components/select_input";
import { vatTypeTranslation } from "../../data/utils";
import { enumToSelectOptions, ISelectEntity } from "../../../../core/utils";
import { CheckboxInput } from "../../../../components/checkbox_input";

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
            workerCount: 0,
            moneyLimit: 0,
            category: "",
            taxType: ETaxType.SimplifiedTax,
            vatType: false,
          }}
          validationSchema={businessTypeFormValidation}
        >
          {({ values }) => (
            <>
              <TextInput label="Name" name="name" />
              <TextInput label="Worker count" name="workerCount" type="number" />
              <TextInput label="Money limit" name="moneyLimit" type="number" />
              <TextInput label="Category" name="category" />

              <SelectInput<ISelectEntity>
                value={values.taxType}
                options={enumToSelectOptions(ETaxType)}
                name="taxType"
                label="Tax type"
                renderLabel={(a) => vatTypeTranslation(a.id == "0" ? false : true)}
              />

              <CheckboxInput label="Vat Includes" name="vatType" />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
