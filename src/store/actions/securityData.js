import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const securityProjectDataDispatch = (projectId) =>
  //   sprintId
  async dispatch => {
    try {
      const response = await api.getSecurityProjectData(projectId);
      dispatch({
        type: actionTypes.SET_SECURITY_PROJECT_DETAILS,
        payload: {
          securityProjectDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

export const securityRepoDataDispatch = (projectId, repoId) => 
  async dispatch => {
    try {
      const response = await api.getSecurityRepoData(projectId, repoId);
      dispatch({
        type: actionTypes.SET_SECURITY_REPO_DETAILS,
        payload: {
          securityRepoDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch(error) {
      console.error(error);
    }
  }


export const repoDropValDispatchSecurity = type => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_REPO,
    payload: {
      currentRepo: type
    }
  });
};