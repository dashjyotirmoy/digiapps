import * as actionTypes from "./actionTypes";
import api from "../../utility/http/devOpsApis";

export const chartDataDispatch = (
  execId,
  projectId,
  sprintId
) => async dispatch => {
  const response = await api.getVelocityData(execId, projectId, sprintId);
  // const response = await JsonApis.get("/JsonData/velocity.json");
  dispatch({
    type: actionTypes.SET_CHARTS_DETAILS,
    payload: {
      chartDetails: response.data,
      chartDataReceived: true
    }
  });
};
