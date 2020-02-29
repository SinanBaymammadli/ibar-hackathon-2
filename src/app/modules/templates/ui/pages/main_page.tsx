import React from "react";
import { Switch, Route } from "react-router-dom";
import { TemplateListPage } from "./list_page";
import { TemplateCreatePage } from "./create_page";
import { TemplateEditPage } from "./edit_page";
import { ROUTES } from "../../../../routes";
import { Routing } from "../../../../core/routing";
import { TemplateDetailPage } from "./detail_page";
import { templateRoutes } from "../routes";
import { KeyWordsPage } from "./key_words_page";

export const TemplateMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.templates} exact>
        <TemplateListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.templates)}>
        <TemplateCreatePage />
      </Route>

      <Route path={`${ROUTES.templates}/${templateRoutes.keyWords}/:id`} exact>
        <KeyWordsPage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.templates)}>
        <TemplateEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.templates)}>
        <TemplateDetailPage />
      </Route>
    </Switch>
  );
};
