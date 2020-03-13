import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const securityDataDispatch = (projectId, execId) =>
  //   sprintId
  async dispatch => {
    try {
      const response = await api.getSecurityMetricsData(projectId, execId);
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

export const repoDropValDispatch = type => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_REPO,
    payload: {
      currentRepo: type
    }
  });
};