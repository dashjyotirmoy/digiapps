import axios from "axios";

const devovopsApi = axios.create({
  baseURL:
    "https://digital-insight-dev.eastus.cloudapp.azure.com/digitalops-service"
});


const getExecInsightsData = (execId) => {
  return devovopsApi.get(
    `executive/${execId}/executiveInsights`
  )
}

const getVelocityData = (execId, projectId) => {
  return devovopsApi.get(`/widget/velocityEfficiencyInsights/?executiveId=${execId}&projectId=${projectId}`);
}

const getProjectInsightsData = (projectId, execId) => {
  return devovopsApi.get(`/project/${projectId}/projectInsights?executiveId=${execId}`);
}

const getProductInfoData = (execId, projectId) => {
  return devovopsApi.get(`/sprint/b7d0d35d-abef-40b6-aef5-3e7f038d7824/sprintInsights?executiveId=${execId}&projectId=${projectId}`)
}

const getSprintInsightsData = (sprintId, execId, projectId) => {
  return devovopsApi.get(`/sprints/${sprintId}/sprintInsights`)
}

export default {
  getVelocityData,
  getExecInsightsData,
  getProductInfoData,
  getProjectInsightsData,
  getSprintInsightsData
};