import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserListPage } from "./list_page";
import { UserCreatePage } from "./create_page";
import { UserEditPage } from "./edit_page";
import { ROUTES } from "../../../../routes";
import { Routing } from "../../../../core/routing";
import { UserDetailPage } from "./detail_page";

export const UserMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.users} exact>
        <UserListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.users)}>
        <UserCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.users)}>
        <UserEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.users)}>
        <UserDetailPage />
      </Route>
    </Switch>
  );
};
