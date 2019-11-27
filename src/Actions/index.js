import JsonApis from "../apis/JsonApis";

export const showComponents = () => async dispatch => {
  const response = await JsonApis.get("/JsonData/SummaryBarData.json");
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
  const response = await JsonApis.get("/JsonData/sprintmock.json");
  dispatch({
    type: "LOAD_PRODUCTS",
    payload: {
      data: response.data,
      recieved: true
    }
  });
};
