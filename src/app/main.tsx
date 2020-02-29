import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import { Layout } from "./layout";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "./redux/store";
import { IAsyncData } from "./core/models";
import { LoadingScreen } from "./components/loading_screen";
import { authReduxActions } from "./modules/auth/ui/state/state";
import { isLoading } from "./core/redux";
import { LoginPage } from "./modules/auth/ui/pages/login_page";
import { UserMainPage } from "./modules/users/ui/pages/main_page";
import { ProfileMainPage } from "./modules/profile/ui/pages/main_page";
import { TemplateMainPage } from "./modules/templates/ui/pages/main_page";
import { FormulaMainPage } from "./modules/formulas/ui/pages/main_page";
import { BusinessTypesMainPage } from "./modules/businessTypes/ui/pages/main_page";
import { OfferMainPage } from "./modules/offers/ui/pages/main_page";

export const Main: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authReduxActions.checkAuth());
  }, [dispatch]);

  const isLoggedInBranch = useSelector<IAppReduxState, IAsyncData<boolean>>((state) => state.auth.isLoggedIn);
  const loading = isLoading(isLoggedInBranch);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : isLoggedInBranch.data ? (
        <Layout>
          <Switch>
            <Route path={ROUTES.users}>
              <UserMainPage />
            </Route>

            <Route path={ROUTES.profile}>
              <ProfileMainPage />
            </Route>

            <Route path={ROUTES.templates}>
              <TemplateMainPage />
            </Route>

            <Route path={ROUTES.formulas}>
              <FormulaMainPage />
            </Route>

            <Route path={ROUTES.businessTypes}>
              <BusinessTypesMainPage />
            </Route>

            <Route path={ROUTES.offers}>
              <OfferMainPage />
            </Route>

            <Route path="*">
              <Redirect to={ROUTES.users} />
            </Route>
          </Switch>
        </Layout>
      ) : (
        <Switch>
          <Route path={ROUTES.login}>
            <LoginPage />
          </Route>
          <Route path="*">
            <Redirect to={ROUTES.login} />
          </Route>
        </Switch>
      )}
    </div>
  );
};
