import * as actionTypes from "./actionTypes";
import api from "../../utility/http/devOpsApis";

export const projInsightDispatch = (projectId, execId) => async dispatch => {
  api
    .getProjectInsightsData(projectId, execId)
    .then(response => {
      dispatch({
        type: actionTypes.LOAD_PRODUCTS,
        payload: {
          projectDetails: response.data,
          projectDataReceived: true
        }
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};
