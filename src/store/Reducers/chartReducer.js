import * as actionType from "../actions/actionTypes";

const initialState = {
  currentTab: "",
  chartType: "",
  currentChartData: {
    chartDetails: {},
    chartDataReceived: false
  }
};
const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.payload.currentTab
      };
    case actionType.SET_CHART_TYPE:
      return {
        ...state,
        chartType: action.payload.chartType
      };
    case actionType.SET_CHARTS_DETAILS:
      return {
        ...state,
        currentChartData: {
          chartDetails: action.payload.chartDetails,
          chartDataReceived: action.payload.chartDataReceived
        }
      };

    default:
      return state;
  }
};

export default chartReducer;
