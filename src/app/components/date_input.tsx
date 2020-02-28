import { DatePicker, DatePickerProps } from "@material-ui/pickers";
import React from "react";
import { Field, FieldProps } from "formik";
import Box from "@material-ui/core/Box";

interface IProps extends Partial<DatePickerProps> {
  label: string;
  name: string;
  validate?: (value: string) => any;
  setFieldValue: (field: any, value: any, shouldValidate?: boolean) => void;
}

export const DateInput: React.FC<IProps> = ({ label, name, onChange, validate, setFieldValue, ...rest }: IProps) => {
  return (
    <Field name={name} validate={validate}>
      {({ meta }: FieldProps): JSX.Element => {
        return (
          <Box mt={2} mb={1}>
            <DatePicker
              label={label}
              value={meta.value}
              name={name}
              onChange={(date) => {
                setFieldValue(name, date);
                onChange && onChange(date);
              }}
              animateYearScrolling
              style={{
                width: "100%",
              }}
              {...rest}
            />
          </Box>
        );
      }}
    </Field>
  );
};
