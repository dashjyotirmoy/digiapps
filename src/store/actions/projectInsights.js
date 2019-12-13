import * as actionTypes from "./actionTypes";
import api from "../../utility/http/devOpsApis";

export const projInsightDispatch = (projectId, execId) => async dispatch => {
  const response = await api.getProjectInsightsData(projectId, execId);
  dispatch({
    type: actionTypes.LOAD_PRODUCTS,
    payload: {
      projectDetails: response.data,
      projectDataReceived: true
    }
  });
};
