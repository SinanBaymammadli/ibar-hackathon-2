import React from "react";
import { Field, FieldProps } from "formik";
import Slider, { SliderProps } from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import { InputLabel } from "@material-ui/core";

interface IProps extends Partial<SliderProps> {
  label: string;
  name: string;
  validate?: (value: string) => any;
  options: { label: string; value: number }[];
  step: number;
  setFieldValue: (fieldName: any, value: any) => void;
  // default
}

export const SliderInput: React.FC<IProps> = ({ label, name, validate, options, setFieldValue, step }: IProps) => {
  return (
    <Box mt={4}>
      <Field name={name} validate={validate}>
        {({ meta }: FieldProps): JSX.Element => {
          return (
            <>
              {label && <InputLabel>{label}</InputLabel>}
              <Slider
                name={name}
                step={step}
                marks={options}
                max={5}
                value={meta.value}
                valueLabelDisplay="on"
                onChange={(e, value) => {
                  setFieldValue(name, value);
                  // field.onChange(e);
                  // onChange && onChange(e);
                }}
                // onBlur={(e) => {
                // field.onBlur(e);
                // onBlur && onBlur(e);
                // }}
              />
            </>
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
    </Box>
  );
};
