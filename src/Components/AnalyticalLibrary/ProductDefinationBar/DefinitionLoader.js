import React, { Component } from "react";
import Velocity from "./ProductDefinition/Velocity";
import Quality from "./ProductDefinition/Quality";
import { Route, Switch } from "react-router-dom";
import Customer from "./ProductDefinition/Customer";
const DefinitionLoader = ({ match }) => {
  const currentProduct = match.params.productSelected;
  if (currentProduct === "digitalops") return <Velocity />;
  if (currentProduct === "velocity") return <Velocity />;
  if (currentProduct === "quality") return <Quality />;
  // if (currentProduct === "contact") return <Velocity />;
  if (currentProduct === "customer") return <Customer />;
  return (
    <div className="w-100 text-center h1 text-danger">
      Definition for PRODUCT not found
    </div>
  );
};

// const routes = [
//   {
//     path: "/velocity",
//     component: Velocity
//   },
//   {
//     path: "/quality",
//     component: Quality
//   }
// ];

// function RouteWithSubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       render={props => <route.component {...props} routes={route.routes} />}
//     />
//   );
// }

// const DefinitionLoader = () => {
//   return (
//     <div>
//       <Switch>
//         {routes.map((route, i) => (
//           <RouteWithSubRoutes key={i} {...route} />
//         ))}
//       </Switch>
//     </div>
//   );
// };

export default DefinitionLoader;
