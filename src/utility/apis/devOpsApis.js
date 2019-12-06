import axios from "axios";
const fallback = "http://IN2366753W1:8080";
const mainBase = "https://digital-insight-dev.eastus.cloudapp.azure.com/digitalops-service"
const devovopsApi = axios.create({
  baseURL: fallback
});


const getExecInsightsData = (execId) => {
  return devovopsApi.get(
    `/executive/${execId}/executiveInsights`
  )
}

const getVelocityData = (execId, projectId) => {
  return devovopsApi.get(`/widget/velocityAndEfficiencyInsights/?executiveId=${execId}&projectId=${projectId}`);
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