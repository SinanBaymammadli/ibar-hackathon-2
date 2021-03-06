import React from "react";
import { Formik, Form as FormikForm, FormikProps } from "formik";
import { Box, Paper } from "@material-ui/core";
import * as Yup from "yup";
import { IFormProps, isAsyncData } from "../core/models";
import { isPending } from "../core/redux";
import { Loading } from "./loading";
import { ErrorPanel } from "./error_panel";

interface IProps<T> extends IFormProps<T> {
  initialValues: T;
  validationSchema: Yup.Schema<T>;
  children?: (props: FormikProps<T>) => React.ReactNode;
}

export function Form<T>({ initialData, onSubmit, branch, initialValues, validationSchema, children }: IProps<T>) {
  const initialLoading = isAsyncData(initialData) ? isPending(initialData) : false;
  const loadedInitialValues = isAsyncData(initialData) ? initialData.data : initialData;

  return (
    <Box mt={4}>
      <Loading loading={initialLoading}>
        <Paper>
          <Box p={2}>
            <ErrorPanel branch={branch} />

            <Formik<T>
              initialValues={loadedInitialValues ?? initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {(props) => <FormikForm>{children?.(props)}</FormikForm>}
            </Formik>
          </Box>
        </Paper>
      </Loading>
    </Box>
  );
}
