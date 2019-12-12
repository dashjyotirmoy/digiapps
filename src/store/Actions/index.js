import api from "../../utility/apis/devOpsApis";
import {
  SET_EXEC_DATA,
  LOAD_PRODUCTS,
  LOAD_CURRENT_SPRINT,
  SET_CHARTS_DETAILS
} from "./actionTypes";

export const execInsightsDispatch = execId => async dispatch => {
  const response = await api.getExecInsightsData(execId);
  let data = response.data;
  data["totalProduct"] = response.data.projects.length;
  dispatch({
    type: SET_EXEC_DATA,
    payload: {
      executiveData: data,
      executiveDataReceived: true
    }
  });
};

export const projInsightDispatch = (projectId, execId) => async dispatch => {
  const response = await api.getProjectInsightsData(projectId, execId);
  // const response = await JsonApis.get("/JsonData/sprintmock.json");
  dispatch({
    type: LOAD_PRODUCTS,
    payload: {
      projectDetails: response.data,
      projectDataReceived: true
    }
  });
};

export const sprintInsightsDispatch = (
  sprintId,
  execId,
  projectId
) => async dispatch => {
  api
    .getSprintInsightsData(sprintId, execId, projectId)
    .then(response => {
      dispatch({
        type: LOAD_CURRENT_SPRINT,
        payload: {
          data: response.data,
          sprintReceived: true
        }
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const chartDataDispatch = (
  execId,
  projectId,
  sprintId
) => async dispatch => {
  const response = await api.getVelocityData(execId, projectId, sprintId);
  // const response = await JsonApis.get("/JsonData/velocity.json");
  dispatch({
    type: SET_CHARTS_DETAILS,
    payload: {
      chartDetails: response.data,
      chartDataReceived: true
    }
  });
};
