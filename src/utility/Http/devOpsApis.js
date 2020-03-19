import axios from "axios";
const fallback = "http://10.170.166.57:8080";
const mainBase =
  "https://digital-insight-dev.eastus.cloudapp.azure.com/digitalops-service";
const devovOpsApi = axios.create({
  baseURL: mainBase
});

const getAllExecutives = () => {
  return devovOpsApi.get(`/executive/all`);
};

const getExecInsightsData = execId => {
  return devovOpsApi.get(`/executive/${execId}/executiveInsights`);
};

const getVelocityData = (execId, projectId, sprintId, teamID) => {
  return devovOpsApi.get(
    `/widget/velocityAndEfficiencyInsights?executiveId=${execId}&projectId=${projectId}&sprintId=${sprintId}&teamId=${teamID}`
  );
};

const getProjectInsightsData = (projectId, execId) => {
  return devovOpsApi.get(
    `/project/${projectId}/projectInsights?executiveId=${execId}`
  );
};

const getSprintInsightsData = (sprintId, execId, projectId, teamID) => {
  return devovOpsApi.get(
    `sprint/${sprintId}/sprintInsights?executiveId=${execId}&projectId=${projectId}&teamId=${teamID}`
  );
};

const getQualityMetricsData = (execId, projectId) => {
  return devovOpsApi.get(
    `/widget/qualityInsights?executiveId=${execId}&projectId=${projectId}`
  );
};

const getSecurityProjectData = (projectId) => {
  return devovOpsApi.get(
    `/widget/security-insights/product?productId=${projectId}`
  );
}

const getSecurityAlertMetricsData = (execId, projectId) => {
  console.log('getSecurityAlertMetricsData', execId, projectId);
  return devovOpsApi.get(
    `/widget/security-insights/alerts?productId=${execId}&projectId=${projectId}`
  );
}

export default {
  getVelocityData,
  getExecInsightsData,
  getProjectInsightsData,
  getSecurityAlertMetricsData,
  getSprintInsightsData,
  getQualityMetricsData,
  getAllExecutives,
  getSecurityProjectData
};
