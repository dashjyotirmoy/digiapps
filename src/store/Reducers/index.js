import execReducer from "../Reducers/execReducer";
import { combineReducers } from "redux";
import prodReducer from "../Reducers/productReducer";
import chartReducer from "../Reducers/chartReducer";
import qualityReducer from "../Reducers/qualityReducer";
import securityReducer from '../Reducers/securityReducer';
import insightReducer from '../Reducers/insightReducer';
import summaryReducer from '../Reducers/summaryReducer';

export default combineReducers({
  execData: execReducer,
  productDetails: prodReducer,
  chartData: chartReducer,
  qualityData: qualityReducer,
  securityData: securityReducer,
  insightData: insightReducer,
  summaryData: summaryReducer
});
