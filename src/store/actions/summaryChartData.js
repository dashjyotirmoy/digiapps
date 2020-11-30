import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const summaryChartDataDispatch = (
  clientId,execId
) => async dispatch => {
  try {
    const response = await api.getSummaryData(
      clientId,execId
    );
    dispatch({
      type: actionTypes.SET_SUMMARY_CHARTS_DETAILS,
      payload: {
        summaryChartDetails: response.data,
        chartDataReceived: true
      }
    });
  } catch (error) {
    console.error(error);
  }
};
