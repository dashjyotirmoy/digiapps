import devovopsApi from "axios";

// const devovopsApi = axios.create();

const getExecInsightsData = execId => {
  return devovopsApi.get(`/JsonData/executiveInsights.json`);
};

const getVelocityData = (execId, projectId) => {
  return devovopsApi.get(`/JsonData/velocityEfficiencyInsights.json`);
};

const getProjectInsightsData = (projectId, execId) => {
  return devovopsApi.get(`/JsonData/projectInsights.json`);
};

const getProductInfoData = (execId, projectId) => {
  return devovopsApi.get(`/JsonData/projectInsights.json`);
};

const getSprintInsightsData = (sprintId, execId, projectId) => {
  return devovopsApi.get(`/JsonData/sprintInsights.json`);
};

const getQualityMetricsData = () => {
  return devovopsApi.get(`/JsonData/qualityData.json`);
};

export default {
  getVelocityData,
  getExecInsightsData,
  getProductInfoData,
  getProjectInsightsData,
  getSprintInsightsData,
  getQualityMetricsData
};
