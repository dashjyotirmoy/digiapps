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
export const summarySecurityChartDataDispatch = (
  clientId,execId
) => async dispatch => {
  try {
    const response = await api.getFileSummaryData(
      clientId,execId
    );
    dispatch({
      type: actionTypes.SET_SUMMARY_SECURITY_CHARTS_DETAILS,
      payload: {
        summarySecurityChartDetails: response.data,
        chartDataReceived: true
      }
    });
  } catch (error) {
    console.error(error);
  }
};
