import TextField, { FilledTextFieldProps } from "@material-ui/core/TextField";
import React from "react";
import { Field, FieldProps } from "formik";
import Slider from "@material-ui/core/Slider";

interface IProps extends Partial<FilledTextFieldProps> {
  label: string;
  name: string;
  validate?: (value: string) => any;
  options: { label: string; value: number }[];
}

export const SliderInput: React.FC<IProps> = ({
  label,
  name,
  type,
  onChange,
  onBlur,
  validate,
  options,
  ...rest
}: IProps) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, meta }: FieldProps): JSX.Element => {
        return (
          <Slider
            name={name}
            step={10}
            marks={options}
            value={meta.value}
            valueLabelDisplay="on"
            onChange={(e) => {
              field.onChange(e);
              // onChange && onChange(e);
            }}
            onBlur={(e) => {
              field.onBlur(e);

              // onBlur && onBlur(e);
            }}
          />
          // <TextField
          //   // size="small"
          //   name={name}
          //   type={type}
          //   label={label}
          //   fullWidth
          //   variant="filled"
          //   margin="normal"
          //   error={Boolean(meta.touched && meta.error)}
          //   helperText={meta.touched && meta.error}
          //   value={meta.value}
          //   onFocus={() => {
          //     if (!meta.touched) {
          //       console.log("remove zero?");
          //     }
          //   }}
          //   onChange={(e) => {
          //     field.onChange(e);
          //     onChange && onChange(e);
          //   }}
          //   onBlur={(e) => {
          //     field.onBlur(e);

          //     onBlur && onBlur(e);
          //   }}
          //   {...rest}
          // />
        );
      }}
    </Field>
  );
};
