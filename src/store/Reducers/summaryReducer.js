import * as actionType from "../actions/actionTypes";

const initialState = {
  summaryChartData: {}
};
const summaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_SUMMARY_CHARTS_DETAILS:
      return {
        ...state,
        summaryChartData: action.payload.summaryChartDetails
      };
    default:
      return state;
  }
};

export default summaryReducer;
