import React from "react";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { Routing } from "../../../../core/routing";
import { BusinessTypeDetailPage } from "./detail_page";
import { BusinessTypeListPage } from "./list_page";
import { BusinessTypeCreatePage } from "./create_page";
import { BusinessTypeEditPage } from "./edit_page";

export const BusinessTypesMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.businessTypes} exact>
        <BusinessTypeListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.businessTypes)}>
        <BusinessTypeCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.businessTypes)}>
        <BusinessTypeEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.businessTypes)}>
        <BusinessTypeDetailPage />
      </Route>
    </Switch>
  );
};
