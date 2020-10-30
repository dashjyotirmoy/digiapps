import axios from "axios";
const fallback = "http://10.170.166.57:8080";
const mainBase =
  "https://fsdet-digitalctp.eastus.cloudapp.azure.com/digitalops-service";
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

const getVelocityProjectData = (projectId) => {
  return devovOpsApi.get(
    `/build/${projectId}/jobs`
  );
};

const getSecurityRepoData = (projectId, repoId) => {
  return devovOpsApi.get(
    `/widget/security-insights/repos?productId=${projectId}&projectId=${repoId}`
  );
};
const getSecurityReleaseData = (branchName,projectId, repoId, releaseName, repoName) => {
  return devovOpsApi.get(
    `/widget/security-insights/repos?branchName=${branchName}&productId=${projectId}&projectId=${repoId}&releaseNumber=${releaseName}&repositoryName=${repoName}`
  );
};
const getSecurityPolicyData = (projectId, repoId) => {
  return devovOpsApi.get(
    `/widget/security-insights/policies?productId=${projectId}&projectId=${repoId}`
  );
}
const getSecurityReleasePolicyData = (branchName,projectId,repoId,releaseName,repoName) => {
  return devovOpsApi.get(
    `/widget/security-insights/policies?branchName=${branchName}&productId=${projectId}&projectId=${repoId}&releaseNumber=${releaseName}&repositoryName=${repoName}`
  );
}

const getSecurityAlertData = (projectId, repoId) => {
  return devovOpsApi.get(
    `/widget/security-insights/alerts?productId=${projectId}&projectId=${repoId}`
  );
}
const getSecurityReleaseAlertData = (branchName,filterID,projectId,repoId,releaseName,repoName) => {
  return devovOpsApi.get(
    `/widget/security-insights/alerts?branchName=${branchName}&filter=${filterID}&productId=${projectId}&projectId=${repoId}&releaseNumber=${releaseName}&repositoryName=${repoName}`
  );
}
const getVelocityBuildData = (projectId, repoId) => {
  return devovOpsApi.get(
    `/build/${projectId}/build-trend?projectId=${repoId}`
  );
}

const getQualityBuildData = (projectId, repoId) => {
  return devovOpsApi.get(
    `/build/${projectId}/build-metrics?projectId=${repoId}`
  );
}

const getSecurityMonthAlertData = (projectId, repoId, filtertype) => {
  return devovOpsApi.get(
    `/widget/security-insights/alerts?productId=${projectId}&projectId=${repoId}&filter=${filtertype}`
  );
}
const getSecurityInsightsData = (branchName,projectId,repoName) => {
  return devovOpsApi.get(`/insights/security?branchName=${branchName}&productId=${projectId}&repositoryName=${repoName}`);
}
const getVelocityInsightsData = (execId,projectId,teamID) => {
  return devovOpsApi.get(`/insights/velocity?executiveId=${execId}&productId=${projectId}&teamId=${teamID}`);
}
const getQualityInsightsData = (branchName,execId,projectId,repoName) => {
  return devovOpsApi.get(`/insights/quality?branchName=${branchName}&executiveId=${execId}&productId=${projectId}&repositoryName=${repoName}`);
}
const getProjectDropdownInsight = (projectId) => {
  return devovOpsApi.get(`/common/dropdown/repository?productId=${projectId}`);
}
const getBranchDropdownInsight = (projectId,repoName) => {
  return devovOpsApi.get(`/common/dropdown/branch?productId=${projectId}&repositoryName=${repoName}`);
}
const getReleaseDropdownInsight = (branchName,projectId,repoName) => {
  return devovOpsApi.get(`/common/dropdown/release?branchName=${branchName}&productId=${projectId}&repositoryName=${repoName}`);
};
const getSummaryData = (execId) => {
  return devovOpsApi.get(
    `/summary/velocity?executiveId=${execId}`
  );
}

export default {
  getVelocityData,
  getQualityBuildData,
  getVelocityBuildData,
  getVelocityProjectData,
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
  getSecurityAlertData,
  getSecurityInsightsData,
  getVelocityInsightsData,
  getQualityInsightsData,
  getProjectDropdownInsight,
  getBranchDropdownInsight,
  getReleaseDropdownInsight,
  getSummaryData,
  getSecurityReleaseData,
  getSecurityReleaseAlertData,
  getSecurityReleasePolicyData
};
