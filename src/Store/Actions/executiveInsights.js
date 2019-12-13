import api from "../../utility/http/devOpsApis";
import * as actionTypes from "./actionTypes";

export const execInsightsDispatch = execId => async dispatch => {
  const response = await api.getExecInsightsData(execId);
  let data = response.data;
  data["totalProduct"] = response.data.projects.length;
  dispatch({
    type: actionTypes.SET_EXEC_DATA,
    payload: {
      executiveData: data,
      executiveDataReceived: true
    }
  });
};
