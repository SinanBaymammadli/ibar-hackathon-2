import React from "react";
import { TextInput } from "../../../../components/text_input";
import { Container, Typography, Paper, Box } from "@material-ui/core";
import { ErrorPanel } from "../../../../components/error_panel";
import { Formik, Form } from "formik";
import { ILoginForm, loginFormValidation } from "../../data/entites";
import { isPending } from "../../../../core/redux";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { IAsyncData } from "../../../../core/models";
import { authReduxActions } from "../state/state";
import { Center } from "../../../../components/center";
import { FormButton } from "../../../../components/form_button";

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const loginBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.auth.login);
  const loading = isPending(loginBranch);

  async function onLogin(form: ILoginForm) {
    await dispatch(authReduxActions.login(form));
    dispatch(authReduxActions.checkAuth());
  }

  return (
    <Container maxWidth="sm">
      <Box m={2}>
        <Center>
          <Typography variant="h4" gutterBottom>
            Sistem
          </Typography>
        </Center>
      </Box>
      <Paper>
        <Box p={4}>
          <ErrorPanel branch={loginBranch} />
          <Formik<ILoginForm>
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginFormValidation}
            onSubmit={onLogin}
          >
            {() => (
              <Form>
                <TextInput label="Email" name="email" type="email" />

                <TextInput label="Password" name="password" type="password" />

                <FormButton label="Login" loading={loading} />
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};
