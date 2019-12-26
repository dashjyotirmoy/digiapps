import axios from "axios";
const fallback = "http://IN2366753W1:8080";
const mainBase =
  "https://digital-insight-dev.eastus.cloudapp.azure.com/digitalops-service";
const devovOpsApi = axios.create({
  baseURL: mainBase
});

const getExecInsightsData = execId => {
  return devovOpsApi.get(`/executive/${execId}/executiveInsights`);
};

const getVelocityData = (execId, projectId, sprintId) => {
  return devovOpsApi.get(
    `/widget/velocityAndEfficiencyInsights?executiveId=${execId}&projectId=${projectId}&sprintId=${sprintId}`
  );
};

const getProjectInsightsData = (projectId, execId) => {
  return devovOpsApi.get(
    `/project/${projectId}/projectInsights?executiveId=${execId}`
  );
};

const getSprintInsightsData = (sprintId, execId, projectId) => {
  return devovOpsApi.get(
    `sprint/${sprintId}/sprintInsights?executiveId=${execId}&projectId=${projectId}`
  );
};

const getQualityMetricsData = (projectId, repositoryId) => {
  return devovOpsApi.get(
    `/widget/qualityInsights?projectId=${projectId}&repositoryId=${repositoryId}`
  );
};

export default {
  getVelocityData,
  getExecInsightsData,
  getProjectInsightsData,
  getSprintInsightsData
};
