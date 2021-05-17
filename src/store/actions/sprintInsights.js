import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const sprintInsightsDispatch = (
  sprintId,
  clientId,
  execId,
  projectId,
  teamID
) => async dispatch => {
  api
    .getSprintInsightsData(sprintId,clientId,execId, projectId, teamID)
    .then(response => {
      dispatch({
        type: actionTypes.LOAD_CURRENT_SPRINT,
        payload: {
          data: response.data,
          sprintReceived: true
        }
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const projectSprintInsightsDispatch = (
  sprintId,
  clientId,
  execId,
  projectId
) => async dispatch => {
  api
    .getProjectSprintData(sprintId,clientId,execId,projectId)
    .then(response => {
      dispatch({
        type: actionTypes.LOAD_CURRENT_PROJECT_SPRINT,
        payload: {
          data: response.data,
          sprintReceived: true
        }
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const insightsSecurity = (
  branchName,clientId, projectId, repoName
) => async dispatch => {
  api
    .getSecurityInsightsData(branchName,clientId, projectId, repoName)
    .then(response => {
      dispatch({
        type: actionTypes.LOAD_SECURITY_DETAILS,
        payload: {
          securityDetails: response.data,
          sprintReceived: true
        }
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const insightsVelocity = (
  clientId,
  executiveId,
  projectId,
  sourceType,
  teamID
) => async dispatch => {
  api
    .getVelocityInsightsData(clientId,executiveId,projectId,sourceType,teamID)
    .then(response => {
      dispatch({
        type: actionTypes.LOAD_VELOCITY_DETAILS,
        payload: {
          velocityInsightDetails: response.data,
          sprintReceived: true
        }
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const insightsQuality = (
  branchName,clientId,executiveId, projectId, repoName
) => async dispatch => {
  api
    .getQualityInsightsData(branchName,clientId,executiveId, projectId, repoName)
    .then(response => {
      dispatch({
        type: actionTypes.LOAD_QUALITY_DETAILS,
        payload: {
          qualityDetails: response.data,
          sprintReceived: true
        }
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const projectDropdownDispatch = (
  clientId,projectId
) => async dispatch => {
  api
    .getProjectDropdownInsight(clientId,projectId)
    .then(response => {
      dispatch({
        type: actionTypes.LOAD_PROJECT_DROPDOWN_DETAILS,
        payload: {
          projectDropdownDetails: response.data,
          sprintReceived: true
        }
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const branchDropdownDispatch = (
  clientId, projectId, repoName
) => async dispatch => {
  api
    .getBranchDropdownInsight(clientId, projectId, repoName)
    .then(response => {
      dispatch({
        type: actionTypes.LOAD_BRANCH_DROPDOWN_DETAILS,
        payload: {
          branchDropdownDetails: response.data,
          sprintReceived: true
        }
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};

