import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const qualityDataDispatch = (projectId, execId) =>
  //   sprintId
  async dispatch => {
    try {
      const response = await api.getQualityMetricsData(projectId, execId);
      dispatch({
        type: actionTypes.SET_QUALITY_DETAILS,
        payload: {
          qualityDetails: response.data,
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
