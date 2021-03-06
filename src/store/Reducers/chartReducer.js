import * as actionType from "../actions/actionTypes";

const initialState = {
  currentTab: "",
  currentTheme: '',
  chartType: "",
  currentRepo: "",
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
    case actionType.SET_CURRENT_THEME:
      return {
        ...state,
        currentTheme: action.payload.currentTheme
      };
    case actionType.SET_CHART_TYPE:
      return {
        ...state,
        chartType: action.payload.chartType
      };
      case actionType.SET_CURRENT_REPO:
        return {
          ...state,
          currentRepo: action.payload.currentRepo
        };
    case actionType.SET_VELOCITY_BUILD_DETAILS:
      return {
        ...state,
        velocityBuildDetails: action.payload.velocityBuildDetails
      };
    case actionType.SET_VELOCITY_PROJECT_DETAILS:
      return {
        ...state,
        velocityProjectDetails: action.payload.velocityProjectDetails
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
