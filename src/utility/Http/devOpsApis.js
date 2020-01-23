import axios from "axios";
const fallback = "http://IN2366753W1:8080";
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

const getQualityMetricsData = (execId, projectId) => {
  return devovOpsApi.get(
    `/widget/qualityInsights?executiveId=${execId}&projectId=${projectId}`
  );
};

export default {
  getVelocityData,
  getExecInsightsData,
  getProjectInsightsData,
  getSprintInsightsData,
  getQualityMetricsData,
  getAllExecutives
};
