import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const projInsightDispatch = (projectId,clientId,execId) => async dispatch => {
  api
    .getProjectInsightsData(projectId,clientId,execId)
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

export const resetProjectRepoDispatch = repoData => dispatch => {
  dispatch({
    type: actionTypes.RESET_PROJECT_REPO,
    payload: {
      resetRepo: repoData
    }
  });
};
