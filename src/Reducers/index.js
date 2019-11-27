import dimReducer from "../Reducers/dimReducer";
import { combineReducers } from "redux";
import prodReducer from "../Reducers/productReducer";
export default combineReducers({
  components: dimReducer,
  products: prodReducer
});
