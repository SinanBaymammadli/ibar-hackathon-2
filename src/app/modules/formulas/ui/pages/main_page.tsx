import React from "react";
import { Switch, Route } from "react-router-dom";
import { FormulaListPage } from "./list_page";
import { FormulaCreatePage } from "./create_page";
import { FormulaEditPage } from "./edit_page";
import { ROUTES } from "../../../../routes";
import { Routing } from "../../../../core/routing";
import { FormulaDetailPage } from "./detail_page";

export const FormulaMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.formulas} exact>
        <FormulaListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.formulas)}>
        <FormulaCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.formulas)}>
        <FormulaEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.formulas)}>
        <FormulaDetailPage />
      </Route>
    </Switch>
  );
};
