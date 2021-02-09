import * as actionType from "../actions/actionTypes";

const initialState = {
  summaryChartData: {},
  summarySecurityChartData:{}
};
const summaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_SUMMARY_CHARTS_DETAILS:
      return {
        ...state,
        summaryChartData: action.payload.summaryChartDetails
      };
      case actionType.SET_SUMMARY_SECURITY_CHARTS_DETAILS:
      return {
        ...state,
        summarySecurityChartData: action.payload.summarySecurityChartDetails
      };
    default:
      return state;
  }
};


export default summaryReducer;
