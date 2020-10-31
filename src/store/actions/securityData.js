import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const securityProjectDataDispatch = (projectId) =>
  //   sprintId
  async dispatch => {
    try {
      if (projectId) {
        const response = await api.getSecurityProjectData(projectId);
        dispatch({
        type: actionTypes.SET_SECURITY_PROJECT_DETAILS,
        payload: {
          securityProjectDetails: response.data,
          chartDataReceived: true
        }
      });
      }
      
    } catch (error) {
      console.error(error);
    }
  };
  export const vulnerabilityDataDispatch = (projectId) =>
  async dispatch => {
    try {
      if (projectId) {
        const response = await api.getVulnerabilityData(projectId);
        dispatch({
        type: actionTypes.SET_VULNERABILITY_DETAILS,
        payload: {
          vulnerabilitytDetails: response.data,
          chartDataReceived: true
        }
      });
      }
      
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
  export const securityReleaseDataDispatch = (branchName,projectId, repoId, releaseId, repoName) => 
  async dispatch => {
    try {
      const response = await api.getSecurityReleaseData(branchName,projectId, repoId, releaseId,repoName);
      dispatch({
        type: actionTypes.SET_SECURITY_RELEASE_DETAILS,
        payload: {
          securityReleaseDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch(error) {
      console.error(error);
    }
  }
  
export const securityPolicyDataDispatch = (projectId, repoId) => 
  async dispatch => {
    try {
      const response = await api.getSecurityPolicyData(projectId, repoId);
      dispatch({
        type: actionTypes.SET_SECURITY_POLICY_DETAILS,
        payload: {
          securityPolicyDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch(error) {
      console.error(error);
    }
  }
  export const securityReleasePolicyDataDispatch = (branchName,projectId,repoId,releaseName,repoName) => 
  async dispatch => {
    try {
      const response = await api.getSecurityReleasePolicyData(branchName,projectId,repoId,releaseName,repoName);
      dispatch({
        type: actionTypes.SET_SECURITY_RELEASE_POLICY_DETAILS,
        payload: {
          securityReleasePolicyDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch(error) {
      console.error(error);
    }
  }
  // getSecurityMonthAlertData

  export const securityAlertDataDispatch = (projectId, repoId) => 
  async dispatch => {
    try {
      const response = await api.getSecurityAlertData(projectId, repoId);
      dispatch({
        type: actionTypes.SET_SECURITY_ALERT_DETAILS,
        payload: {
          securityAlertDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch(error) {
      console.error(error);
    }
  }
// get alert data from release label
  export const securityReleaseAlertDataDispatch = (branchName,filterID,projectId,repoId,releaseName,repoName) => 
  async dispatch => {
    try {
      const response = await api.getSecurityReleaseAlertData(branchName,filterID,projectId,repoId,releaseName,repoName);
      dispatch({
        type: actionTypes.SET_SECURITY_RELEASE_ALERT_DETAILS,
        payload: {
          securityReleaseAlertDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch(error) {
      console.error(error);
    }
  }
  export const securityMonthAlertDataDispatch = (projectId, repoId, filterType) => 
  async dispatch => {
    try {
      const response = await api.getSecurityMonthAlertData(projectId, repoId, filterType);
      dispatch({
        type: actionTypes.SET_SECURITY_MONTH_ALERT_DETAILS,
        payload: {
          securityMonthAlertDetails: response.data,
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
export const insightsSecurity = (
  branchName, projectId, repoName
) => async dispatch => {
  api
    .getSecurityInsightsData(branchName, projectId, repoName)
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