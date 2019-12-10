import api from "../../utility/apis/devOpsApis";

export const execInsightsDispatch = (execId) => async dispatch => {
  const response = await api.getExecInsightsData(execId);
  // const response = await JsonApis.get("/JsonData/SummaryBarData.json");
  let data = response.data;
  data["totalProduct"] = response.data.projects.length;
  dispatch({
    type: "SET_EXEC_DATA",
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
    type: "LOAD_PRODUCTS",
    payload: {
      projectDetails: response.data,
      projectDataReceived: true
    }
  });
};


export const sprintInsightsDispatch = (sprintId, execId, projectId) => async dispatch => {
  api.getSprintInsightsData
    (
      "b7d0d35d-abef-40b6-aef5-3e7f038d7824",
      "4c78ede2-1be2-66e5-8dc7-bc89cc8dfe0f",
      "fa2a71e3-1469-4240-9f8b-5694a98145cf"
    ).then(response => {
      dispatch({
        type: "LOAD_CURRENT_SPRINT",
        payload: {
          data: response.data,
          sprintReceived: true
        }
      });
    }).catch(error => {
      console.log(error.message);
    });

};


export const chartDataDispatch = (execId, projectId, sprintId) => async dispatch => {
  const response = await api.getVelocityData(execId, projectId, sprintId);
  // const response = await JsonApis.get("/JsonData/velocity.json");
  dispatch({
    type: "SET_CHARTS_DETAILS",
    payload: {
      chartDetails: response.data,
      chartDataReceived: true
    }
  });
};
