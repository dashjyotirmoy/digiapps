import api from "../../utility/apis/devOpsApis";

export const showComponents = () => async dispatch => {
  const response = await api.getExecInsightsData(
    "4c78ede2-1be2-66e5-8dc7-bc89cc8dfe0f"
  );
  // const response = await JsonApis.get("/JsonData/SummaryBarData.json");
  let data = response.data;
  data["totalProduct"] = response.data.projects.length;
  dispatch({
    type: "LOAD_MAINMETRIC",
    payload: {
      data,
      flag: true
    }
  });
};

export const prodInfo = () => async dispatch => {
  const response = await api.getProductInfoData(
    "4c78ede2-1be2-66e5-8dc7-bc89cc8dfe0f", "fa2a71e3-1469-4240-9f8b-5694a98145cf"
  );
  // const response = await JsonApis.get("/JsonData/sprintmock.json");
  dispatch({
    type: "LOAD_PRODUCTS",
    payload: {
      data: response.data,
      recieved: true
    }
  });
};

export const chartData = (execId, projectId) => async dispatch => {
  const response = await api.getVelocityData(execId, projectId);
  // const response = await JsonApis.get("/JsonData/velocity.json");
  dispatch({
    type: "LOAD_CHARTS",
    payload: {
      data: response.data,
      recieved: true
    }
  });
};
