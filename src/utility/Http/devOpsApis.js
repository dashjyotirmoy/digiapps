import axios from "axios";
const fallback = "http://10.170.166.57:8080";
// const clientName = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
// const clientname = clientName !== 'digitalops' ? "/"+clientName : '';
// const mainBase =
//   `https://fsdet-digitalctp.eastus.cloudapp.azure.com${clientname}/digitalops-service`;
const mainBase =
  `https://fsdet-digitalctp.eastus.cloudapp.azure.com/digitalops-service`;
const devovOpsApi = axios.create({
  baseURL: mainBase
});
const getAllClientList = () => {
  return devovOpsApi.get(`/clientDetails/fetchClientList`);
};
const getWidgetList = (clientId) => {
  return devovOpsApi.get(`/clientDetails/fetchWidgetList?clientId=${clientId}`);
};

const getAllExecutives = (clientId) => {
  return devovOpsApi.get(`/executive/all?clientId=${clientId}`);
};
const getExecInsightsData = (execId,clientId) => {
  return devovOpsApi.get(`/executive/${execId}/executive-insights?clientId=${clientId}`);
};

const getVelocityData = (clientId,execId, projectId,sourceTypeId,sprintId, teamID) => {
  return devovOpsApi.get(
    `/widget/velocity-efficiency-insights?clientId=${clientId}&executiveId=${execId}&projectId=${projectId}&sourceTypeId=${sourceTypeId}&sprintId=${sprintId}&teamId=${teamID}`
  );
};
const getSummaryData = (clientId,execId) => {
  return devovOpsApi.get(
    `/summary/velocity?clientId=${clientId}&executiveId=${execId}`
  );
};
const getProjectInsightsData = (projectId,clientId,execId) => {
  return devovOpsApi.get(
    `/project/${projectId}/project-insights?clientId=${clientId}&executiveId=${execId}`
  );
};

const getSprintInsightsData = (sprintId,clientId,execId, projectId, teamID) => {
  return devovOpsApi.get(
    `team-sprint/${sprintId}/sprint-insights?clientId=${clientId}&executiveId=${execId}&projectId=${projectId}&teamId=${teamID}`
  );
};
const getProjectSprintData = (sprintId,clientId,execId,projectId) => {
  return devovOpsApi.get(
    `sprint/${sprintId}/sprint-insights?clientId=${clientId}&executiveId=${execId}&projectId=${projectId}`
  );
};

const getQualityMetricsData = (clientId,execId, projectId) => {
  return devovOpsApi.get(
    `/widget/quality-insights?clientId=${clientId}&executiveId=${execId}&projectId=${projectId}`
  );
};
const getQualityReleaseMetricsData = (branchName,clientId,execId, projectId,releaseName, repoName) => {
  return devovOpsApi.get(
    `/widget/quality-insights?branchName=${branchName}&clientId=${clientId}&executiveId=${execId}&projectId=${projectId}&releaseNumber=${releaseName}&repositoryName=${repoName}`
  );
};
const getQualityMetricsDrilledDownData = (clientId,execId,metricsType,repoId, projectId) => {
  return devovOpsApi.get(
    `/widget/quality-insights/charts?clientId=${clientId}&executiveId=${execId}&metric=${metricsType}&repoId=${repoId}&projectId=${projectId}`
  );
};
const getQualityMetricsDrilledFilterDownData = (branchName,clientId,execId,metricsType,projectId,releaseName,repoId,repoName) => {
  return devovOpsApi.get(
    `/widget/quality-insights/charts?branchName=${branchName}&clientId=${clientId}&executiveId=${execId}&metric=${metricsType}&projectId=${projectId}&releaseNumber=${releaseName}&repoId=${repoId}&repositoryName=${repoName}`
  );
};
// widget/quality-insights/charts?executiveId={} &projectId={}&repoId={}&metric={}

const getSecurityProjectData = (clientId,projectId) => {
  return devovOpsApi.get(
    `/widget/security-insights/product?clientId=${clientId}&productId=${projectId}`
  );
};

const getVelocityProjectData = (projectId,clientId) => {
  return devovOpsApi.get(
    `/build/${projectId}/jobs?clientId=${clientId}`
  );
};

const getSecurityRepoData = (clientId,projectId, repoId) => {
  return devovOpsApi.get(
    `/widget/security-insights/repos?clientId=${clientId}&productId=${projectId}&projectId=${repoId}`
  );
};
const getSecurityReleaseData = (branchName,clientId,projectId, repoId, releaseName, repoName) => {
  return devovOpsApi.get(
    `/widget/security-insights/repos?branchName=${branchName}&clientId=${clientId}&productId=${projectId}&projectId=${repoId}&releaseNumber=${releaseName}&repositoryName=${repoName}`
  );
};

const getSecurityPolicyData = (clientId,projectId, repoId) => {
  return devovOpsApi.get(
    `/widget/security-insights/policies?clientId=${clientId}&productId=${projectId}&projectId=${repoId}`
  );
}
const getSecurityReleasePolicyData = (branchName,clientId,projectId,repoId,releaseName,repoName) => {
  return devovOpsApi.get(
    `/widget/security-insights/policies?branchName=${branchName}&clientId=${clientId}&productId=${projectId}&projectId=${repoId}&releaseNumber=${releaseName}&repositoryName=${repoName}`
  );
}

const getSecurityAlertData = (clientId,projectId, repoId) => {
  return devovOpsApi.get(
    `/widget/security-insights/alerts?clientId=${clientId}&productId=${projectId}&projectId=${repoId}`
  );
}

const getSecurityReleaseAlertData = (branchName,clientId,filterID,projectId,repoId,releaseName,repoName) => {
  return devovOpsApi.get(
    `/widget/security-insights/alerts?branchName=${branchName}&clientId=${clientId}&filter=${filterID}&productId=${projectId}&projectId=${repoId}&releaseNumber=${releaseName}&repositoryName=${repoName}`
  );
}
const getVelocityBuildData = (projectId,clientId,repoId) => {
  return devovOpsApi.get(
    `/build/${projectId}/build-trend?clientId=${clientId}&projectId=${repoId}`
  );
}

const getQualityBuildData = (projectId,clientId,repoId) => {
  return devovOpsApi.get(
    `/build/${projectId}/build-metrics?clientId=${clientId}&projectId=${repoId}`
  );
}

const getSecurityMonthAlertData = (clientId,projectId, repoId, filtertype) => {
  return devovOpsApi.get(
    `/widget/security-insights/alerts?clientId=${clientId}&filter=${filtertype}&productId=${projectId}&projectId=${repoId}`
  );
}
const getSecurityInsightsData = (branchName,clientId,projectId,repoName) => {
  return devovOpsApi.get(`/insights/security?branchName=${branchName}&clientId=${clientId}&productId=${projectId}&repositoryName=${repoName}`);
};
const getVelocityInsightsData = (clientId,execId,projectId,sourceType,teamID) => {
  return devovOpsApi.get(`/insights/velocity?clientId=${clientId}&executiveId=${execId}&productId=${projectId}&sourceTypeId=${sourceType}&teamId=${teamID}`);
};
const getQualityInsightsData = (branchName,clientId,execId,projectId,repoName) => {
  return devovOpsApi.get(`/insights/quality?branchName=${branchName}&clientId=${clientId}&executiveId=${execId}&productId=${projectId}&repositoryName=${repoName}`);
};
const getProjectDropdownInsight = (clientId,projectId) => {
  return devovOpsApi.get(`/common/dropdown/repository?clientId=${clientId}&productId=${projectId}`);
};
const getBranchDropdownInsight = (clientId,projectId,repoName) => {
  return devovOpsApi.get(`/common/dropdown/branch?clientId=${clientId}&productId=${projectId}&repositoryName=${repoName}`);
};
const getReleaseDropdownInsight = (branchName,clientId,projectId,repoName) => {
  return devovOpsApi.get(`/common/dropdown/release?branchName=${branchName}&clientId=${clientId}&productId=${projectId}&repositoryName=${repoName}`);
};
const getVulnerabilityData = (clientId,projectId) => {
  return devovOpsApi.get(
    `/widget/security-insights/vulnerability-detail?clientId=${clientId}&productId=${projectId}`
  );
};
export default {
  getAllClientList,
  getVelocityData,
  getQualityBuildData,
  getVelocityBuildData,
  getVelocityProjectData,
  getExecInsightsData,
  getProjectInsightsData,
  getSprintInsightsData,
  getQualityMetricsData,
  getQualityMetricsDrilledDownData,
  getQualityMetricsDrilledFilterDownData,
  getAllExecutives,
  getSecurityProjectData,
  getSecurityMonthAlertData,
  getSecurityRepoData,
  getSecurityReleaseData,
  getSecurityPolicyData,
  getSecurityReleasePolicyData,
  getSecurityAlertData,
  getSecurityReleaseAlertData,
  getSecurityInsightsData,
  getVelocityInsightsData,
  getQualityInsightsData,
  getProjectDropdownInsight,
  getBranchDropdownInsight,
  getReleaseDropdownInsight,
  getQualityReleaseMetricsData,
  getSummaryData,
  getVulnerabilityData,
  getWidgetList,
  getProjectSprintData
};
