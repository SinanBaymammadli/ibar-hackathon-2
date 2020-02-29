import React from "react";
import { Field, FieldProps } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

interface IProps {
  label: string;
  name: string;
}

export const CheckboxInput: React.FC<IProps> = ({ label, name }: IProps) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps): JSX.Element => {
        return (
          <FormControlLabel
            checked={meta.value}
            name={name}
            onChange={field.onChange}
            control={<Checkbox color="primary" />}
            label={label}
            labelPlacement="start"
          />
        );
      }}
    </Field>
  );
};
