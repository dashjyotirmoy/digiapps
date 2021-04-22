import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";
export const buildPullDataDispatch = (clientId,filter,productId,sourceTypeId) =>
  async dispatch => {
    try {
      if (productId) {
        const response = await api.getBuildReleasePullData(clientId,filter,productId,sourceTypeId);
        dispatch({
        type: actionTypes.SET_BUILD_RELEASE_PULL_DETAILS,
        payload: {
          buildPullProjectDetails: response.data,
          chartDataReceived: true
        }
      });
      }
      
    } catch (error) {
      console.error(error);
    }
  };
  export const buildReleaseDataDispatch = (clientId,filter,productId,repositoryId,sourceTypeId) =>
  async dispatch => {
    try {
        const response = await api.getBuildReleaseData(clientId,filter,productId,repositoryId,sourceTypeId);
        dispatch({
        type: actionTypes.SET_BUILD_RELEASE_DETAILS,
        payload: {
          buildReleaseProjectDetails: response.data,
          chartDataReceived: true
        }
      });      
    } catch (error) {
      console.error(error);
    }
  };
  export const buildRepoDropValDispatch = type => dispatch => {
    dispatch({
      type: actionTypes.SET_CURRENT_REPO,
      payload: {
        currentRepo: type
      }
    });
  };

  
