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
import { SliderInput } from "../../../../components/slider_input";

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
            minRating: 2,
            activityCategoryId: EActivityCategory.Accomadation,
            file: undefined,
          }}
          validationSchema={offerFormValidation}
        >
          {({ values, setFieldValue }) => (
            <>
              <TextInput label="Min cash flow" name="minCashFlow" type="number" />

              {/* <TextInput label="minRating" name="minRating" /> */}

              <SliderInput
                label="Min rating"
                name="minRating"
                step={1}
                defaultValue={2}
                setFieldValue={setFieldValue}
                options={[
                  {
                    value: 1,
                    label: "1",
                  },
                  {
                    value: 2,
                    label: "2",
                  },
                  {
                    value: 3,
                    label: "3",
                  },
                  {
                    value: 4,
                    label: "4",
                  },
                  {
                    value: 5,
                    label: "5",
                  },
                ]}
              />

              <SelectInput<ISelectEntity>
                value={values.activityCategoryId}
                options={enumToSelectOptions(EActivityCategory)}
                name="activityCategoryId"
                label="Activity category"
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
