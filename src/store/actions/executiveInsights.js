import api from "../../utility/Http/devOpsApis";
import * as actionTypes from "./actionTypes";

export const clientListDispatch = () => async dispatch => {
  try {
    const response = await api.getAllClientList();
    let data = response.data;
    dispatch({
      type: actionTypes.GET_CLIENT_ID_DATA,
      payload: {
          getAllClient: data
      }
    });
  } catch (error) {
    console.error(error);
  }
};
export const execAllDispatch = () => async dispatch => {
  try {
    const response = await api.getAllExecutives();
    let data = response.data;
    dispatch({
      type: actionTypes.GET_EXEC_DATA,
      payload: {
        getAllExec: data
      }
    });
  } catch (error) {
    console.error(error);
  }
};
export const execInsightsDispatch = execId => async dispatch => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};
