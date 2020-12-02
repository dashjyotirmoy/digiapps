import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const qualityDataDispatch = (clientId,execId,projectId) =>
  //   sprintId
  async dispatch => {
    try {
      const response = await api.getQualityMetricsData(clientId,execId,projectId);
      dispatch({
        type: actionTypes.SET_QUALITY_DETAILS,
        payload: {
          qualityDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  export const qualityReleaseDataDispatch = (branchName,clientId,execId, projectId,releaseName, repoName) =>
  //   sprintId
  async dispatch => {
    try {
      const response = await api.getQualityReleaseMetricsData(branchName,clientId,execId, projectId,releaseName, repoName);
      dispatch({
        type: actionTypes.SET_QUALITY_RELEASE_DETAILS,
        payload: {
          qualityBuildReleaseDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  export const qualityBuildDataDispatch = (projectId,clientId,repoId) => 
  async dispatch => {
    try {
      const response = await api.getQualityBuildData(projectId,clientId,repoId);
      dispatch({
        type: actionTypes.SET_QUALITY_BUILD_DETAILS,
        payload: {
          qualityBuildDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch(error) {
      console.error(error);
    }
  }
  export const qualityDrilledDownDataDispatch = (clientId,execId,metricsType,repoId, projectId) =>
  //   sprintId
  async dispatch => {
    try {
      const response = await api.getQualityMetricsDrilledDownData(clientId,execId,metricsType,repoId,projectId);
      dispatch({
        type: actionTypes.SET_QUALITY_DRILLED_DOWN_DETAILS,
        payload: {
          qualityDrilledDownDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  export const qualityDrilledDownDataFilterDispatch = (branchName,clientId,execId,metricsType, projectId,releaseName, repoId,repoName) =>
  //   sprintId
  async dispatch => {
    try {
      const response = await api.getQualityMetricsDrilledFilterDownData(branchName,clientId,execId,metricsType, projectId,releaseName, repoId,repoName);
      dispatch({
        type: actionTypes.SET_QUALITY_DRILLED_DOWN_FILTER_DETAILS,
        payload: {
          qualityDrilledDownFilterDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  export const repoDropValDispatch = type => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_REPO,
    payload: {
      currentRepo: type
    }
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