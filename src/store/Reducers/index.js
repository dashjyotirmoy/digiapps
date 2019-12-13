import execReducer from "../reducers/execReducer";
import { combineReducers } from "redux";
import prodReducer from "../reducers/productReducer";
import chartReducer from "../reducers/chartReducer";
export default combineReducers({
  execData: execReducer,
  productDetails: prodReducer,
  chartData: chartReducer
});
