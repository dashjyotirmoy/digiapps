import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const securityDataDispatch = (execId, projectId) =>
  //   sprintId
  async dispatch => {
    try {
      const response = await api.getSecurityMetricsData(execId, projectId);
      dispatch({
        type: actionTypes.SET_SECURITY_DETAILS,
        payload: {
          securityDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

export const repoDropValDispatchSecurity = type => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_REPO,
    payload: {
      currentRepo: type
    }
  });
};