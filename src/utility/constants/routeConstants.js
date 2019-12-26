import Velocity from "../../components/analyticalLibrary/ProductDefinationBar/ProductDefinition/Velocity";
import Quality from "../../components/analyticalLibrary/ProductDefinationBar/ProductDefinition/Quality";
import Customer from "../../components/analyticalLibrary/ProductDefinationBar/ProductDefinition/Customer";
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
    path: "/customer",
    component: Customer
  }
];
