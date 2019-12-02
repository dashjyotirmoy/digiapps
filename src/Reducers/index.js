import dimReducer from "../Reducers/dimReducer";
import { combineReducers } from "redux";
import prodReducer from "../Reducers/productReducer";
import chartReducer from "../Reducers/chartReducer";
export default combineReducers({
  dimensions: dimReducer,
  productdetails: prodReducer,
  chartData: chartReducer
});
