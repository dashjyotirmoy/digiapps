import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "../../../utility/constants/routeConstants";

//function to load the route dynamically

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
}

//Parent function which manages routes

const DefinitionLoader = () => {
  return (
    <div>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
};

export default DefinitionLoader;
