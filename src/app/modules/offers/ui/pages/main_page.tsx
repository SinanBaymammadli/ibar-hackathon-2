import React from "react";
import { Switch, Route } from "react-router-dom";
import { OfferListPage } from "./list_page";
import { OfferCreatePage } from "./create_page";
import { OfferEditPage } from "./edit_page";
import { ROUTES } from "../../../../routes";
import { Routing } from "../../../../core/routing";
import { OfferDetailPage } from "./detail_page";

export const OfferMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.offers} exact>
        <OfferListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.offers)}>
        <OfferCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.offers)}>
        <OfferEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.offers)}>
        <OfferDetailPage />
      </Route>
    </Switch>
  );
};
