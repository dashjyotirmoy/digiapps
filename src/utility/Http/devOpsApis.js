import axios from "axios";
const fallback = "http://10.170.166.57:8080";
const mainBase =
  "https://fsdet-digital.eastus.cloudapp.azure.com/digitalops-service";
const devovOpsApi = axios.create({
  baseURL: mainBase
});

const getAllExecutives = () => {
  return devovOpsApi.get(`/executive/all`);
};

const getExecInsightsData = execId => {
  return devovOpsApi.get(`/executive/${execId}/executive-insights`);
};

const getVelocityData = (execId, projectId, sprintId, teamID) => {
  return devovOpsApi.get(
    `/widget/velocity-efficiency-insights?executiveId=${execId}&projectId=${projectId}&sprintId=${sprintId}&teamId=${teamID}`
  );
};

const getProjectInsightsData = (projectId, execId) => {
  return devovOpsApi.get(
    `/project/${projectId}/project-insights?executiveId=${execId}`
  );
};

const getSprintInsightsData = (sprintId, execId, projectId, teamID) => {
  return devovOpsApi.get(
    `sprint/${sprintId}/sprint-insights?executiveId=${execId}&projectId=${projectId}&teamId=${teamID}`
  );
};

const getQualityMetricsData = (execId, projectId) => {
  return devovOpsApi.get(
    `/widget/quality-insights?executiveId=${execId}&projectId=${projectId}`
  );
};

const getQualityMetricsDrilledDownData = (execId, projectId, repoId, metricsType) => {
  return devovOpsApi.get(
    `/widget/quality-insights/charts?executiveId=${execId} &projectId=${projectId}&repoId=${repoId}&metric=${metricsType}`
  );
};

// widget/quality-insights/charts?executiveId={} &projectId={}&repoId={}&metric={}

const getSecurityProjectData = (projectId) => {
  return devovOpsApi.get(
    `/widget/security-insights/product?productId=${projectId}`
  );
};

const getSecurityRepoData = (projectId, repoId) => {
  return devovOpsApi.get(
    `/widget/security-insights/repos?productId=${projectId}&projectId=${repoId}`
  );
};

const getSecurityPolicyData = (projectId, repoId) => {
  return devovOpsApi.get(
    `/widget/security-insights/policies?productId=${projectId}&projectId=${repoId}`
  );
}

const getSecurityAlertData = (projectId, repoId) => {
  return devovOpsApi.get(
    `/widget/security-insights/alerts?productId=${projectId}&projectId=${repoId}`
  );
}

const getSecurityMonthAlertData = (projectId, repoId, filtertype) => {
  return devovOpsApi.get(
    `/widget/security-insights/alerts?productId=${projectId}&projectId=${repoId}&filter=${filtertype}`
  );
}

export default {
  getVelocityData,
  getExecInsightsData,
  getProjectInsightsData,
  getSprintInsightsData,
  getQualityMetricsData,
  getQualityMetricsDrilledDownData,
  getAllExecutives,
  getSecurityProjectData,
  getSecurityMonthAlertData,
  getSecurityRepoData,
  getSecurityPolicyData,
  getSecurityAlertData
};
