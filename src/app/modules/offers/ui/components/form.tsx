import React from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { offerFormValidation, IOfferForm, EActivityCategory } from "../../data/entities";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";
import { SelectInput } from "../../../../components/select_input";
import { ISelectEntity, enumToSelectOptions } from "../../../../core/utils";
import { FileInput } from "../../../../components/file_input";

interface IProps extends IFormProps<IOfferForm> {}

export const OfferForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <Form<IOfferForm>
          {...props}
          initialValues={{
            minCashFlow: 0,
            minRating: 0,
            activityCategoryId: EActivityCategory.Accomadation,
            file: undefined,
          }}
          validationSchema={offerFormValidation}
        >
          {({ values, setFieldValue }) => (
            <>
              <TextInput label="minCashFlow" name="minCashFlow" />

              <TextInput label="minRating" name="minRating" />

              <SelectInput<ISelectEntity>
                value={values.activityCategoryId}
                options={enumToSelectOptions(EActivityCategory)}
                name="activityCategoryId"
                label="activityCategoryId"
                renderLabel={(a) => a.label}
              />

              <FileInput label="Image" name="file" setFieldValue={setFieldValue} />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
