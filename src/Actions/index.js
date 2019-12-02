import JsonApis from "../apis/JsonApis";

export const showComponents = () => async dispatch => {
  const response = await JsonApis.get(
    "executive/4c78ede2-1be2-66e5-8dc7-bc89cc8dfe0f/executiveInsights"
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
  const response = await JsonApis.get(
    "sprint/b7d0d35d-abef-40b6-aef5-3e7f038d7824/sprintInsights?executiveId=4c78ede2-1be2-66e5-8dc7-bc89cc8dfe0f&projectId=fa2a71e3-1469-4240-9f8b-5694a98145cf"
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

export const chartData = () => async dispatch => {
  const response = await JsonApis.get(
    "widget/velocityAndEfficiencyInsights/?executiveId=4c78ede2-1be2-66e5-8dc7-bc89cc8dfe0f&projectId=fa2a71e3-1469-4240-9f8b-5694a98145cf"
  );
  // const response = await JsonApis.get("/JsonData/velocity.json");
  dispatch({
    type: "LOAD_CHARTS",
    payload: {
      data: response.data,
      recieved: true
    }
  });
};
