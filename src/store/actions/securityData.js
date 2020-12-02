import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const securityProjectDataDispatch = (clientId,projectId) =>
  //   sprintId
  async dispatch => {debugger
    try {
      if (projectId) {
        const response = await api.getSecurityProjectData(clientId,projectId);
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
  export const vulnerabilityDataDispatch = (clientId,projectId) =>
  async dispatch => {
    try {
      if (projectId) {
        const response = await api.getVulnerabilityData(clientId,projectId);
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
  export const securityReleaseDataDispatch = (branchName,clientId,projectId, repoId, releaseId, repoName) => 
  async dispatch => {
    try {
      const response = await api.getSecurityReleaseData(branchName,clientId,projectId, repoId, releaseId,repoName);
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
  
export const securityPolicyDataDispatch = (clientId,projectId, repoId) => 
  async dispatch => {
    try {
      const response = await api.getSecurityPolicyData(clientId,projectId, repoId);
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
  export const securityReleasePolicyDataDispatch = (branchName,clientId,projectId,repoId,releaseName,repoName) => 
  async dispatch => {
    try {
      const response = await api.getSecurityReleasePolicyData(branchName,clientId,projectId,repoId,releaseName,repoName);
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

  export const securityAlertDataDispatch = (clientId,projectId, repoId) => 
  async dispatch => {
    try {
      const response = await api.getSecurityAlertData(clientId,projectId, repoId);
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
  export const securityReleaseAlertDataDispatch = (branchName,clientId,filterID,projectId,repoId,releaseName,repoName) => 
  async dispatch => {
    try {
      const response = await api.getSecurityReleaseAlertData(branchName,clientId,filterID,projectId,repoId,releaseName,repoName);
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
  branchName,clientId,projectId, repoName
) => async dispatch => {
  api
    .getSecurityInsightsData(branchName,clientId,projectId, repoName)
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