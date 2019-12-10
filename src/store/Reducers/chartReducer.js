const initialState = {
  chartType: "",
  currentChartData: {
    chartDetails: {},
    chartDataReceived: false
  }
};
const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHART_TYPE':
      return {
        ...state,
        chartType: action.payload.chartType
      }
    case "SET_CHARTS_DETAILS":
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
