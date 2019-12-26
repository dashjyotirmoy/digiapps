import * as actionTypes from "./actionTypes";
import api from "../../utility/http/devOpsApis";

export const qualityDataDispatch = () =>
  //   execId,
  //   projectId,
  //   sprintId
  async dispatch => {
    try {
      const response = await api.getVelocityData(execId, projectId, sprintId);
      dispatch({
        type: actionTypes.SET_CHARTS_DETAILS,
        payload: {
          chartDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
