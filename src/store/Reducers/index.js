import execReducer from "../Reducers/execReducer";
import { combineReducers } from "redux";
import prodReducer from "../Reducers/productReducer";
import chartReducer from "../Reducers/chartReducer";
export default combineReducers({
  execData: execReducer,
  productDetails: prodReducer,
  chartData: chartReducer
});
