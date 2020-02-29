import React, { useEffect } from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps, IAsyncData } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { templateFormValidation, ITemplateForm, EPeriod } from "../../data/entities";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";
import { FileInput } from "../../../../components/file_input";
import { SelectInput } from "../../../../components/select_input";
import { IBusinessType } from "../../../businessTypes/data/entities";
import { businessTypeReduxActions } from "../../../businessTypes/ui/state/state";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { ISelectEntity, enumToSelectOptions } from "../../../../core/utils";

interface IProps extends IFormProps<ITemplateForm> {}

export const TemplateForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(businessTypeReduxActions.getList());
  }, [dispatch]);
  const formulaListBranch = useSelector<IAppReduxState, IAsyncData<IBusinessType[]>>(
    (state) => state.businessType.list,
  );

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={6}>
        <Form<ITemplateForm>
          {...props}
          initialValues={{
            name: "",
            file: undefined,
            businessTypeId: "1",
            period: EPeriod.Quarter,
          }}
          validationSchema={templateFormValidation}
        >
          {({ values, setFieldValue }) => (
            <>
              <TextInput label="Name" name="name" />
              <SelectInput<IBusinessType>
                value={values.businessTypeId}
                options={formulaListBranch}
                name="businessTypeId"
                label="Business type"
                renderLabel={(a) => a.name}
              />
              <SelectInput<ISelectEntity>
                value={values.period}
                options={enumToSelectOptions(EPeriod)}
                name="period"
                label="Period"
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
