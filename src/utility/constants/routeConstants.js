import Velocity from "../../components/analyticalLibrary/ProductDefinationBar/ProductDefinition/Velocity";
import Quality from "../../components/analyticalLibrary/ProductDefinationBar/ProductDefinition/Quality";
import Customer from "../../components/analyticalLibrary/ProductDefinationBar/ProductDefinition/Customer";
import Insights from "../../components/analyticalLibrary/ProductDefinationBar/ProductDefinition/Insights";
import Security from "../../components/analyticalLibrary/ProductDefinationBar/ProductDefinition/Security";
import Overview from "../../components/analyticalLibrary/ProductDefinationBar/ProductDefinition/Overview";



export const routes = [
  {
    path: "/velocity",
    component: Velocity
  },
  {
    path: "/quality",
    component: Quality
  },
  {
    path: "/security",
    component: Security
  },
  {
    path: "/customer",
    component: Customer
  },
  {
    path: "/insights",
    component: Insights
  },
  {
    path: "/overview",
    component: Overview
  },
];
