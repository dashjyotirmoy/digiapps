import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const securityAlertDataDispatch = (execId, projectId) =>
  //   sprintId
  async dispatch => {
    try {
      const response = await api.getSecurityAlertMetricsData(execId, projectId);
      console.log('vvvvvvvvvvvvvvvvvvvvvvvv', response);
      dispatch({
        type: actionTypes.SET_SECURITY_DETAILS,
        payload: {
          securityAlertDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

export const repoDropValDispatchSecurityAlert = type => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_REPO,
    payload: {
      currentRepo: type
    }
  });
};