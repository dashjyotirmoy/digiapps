import api from "../../utility/Http/devOpsApis";
import * as actionTypes from "./actionTypes";

export const clientListDispatch = (currentID) => async dispatch => {
  try {
    const response = await api.getAllClientList();
    let data = response.data;
    dispatch({
      type: actionTypes.GET_CLIENT_ID_DATA,
      payload: {
        getAllClient: data,
        currentClientID: currentID
      },
    });
  } catch (error) {
    console.error(error);
  }
};
export const widgetListDispatch = (currentID) => async dispatch => {
  try {
    const response = await api.getWidgetList(currentID);
    let data = response.data;
    dispatch({
      type: actionTypes.GET_WIDGET_LIST_DATA,
      payload: {
        getAllWidgetList: data
      },
    });
  } catch (error) {
    console.error(error);
  }
};
export const execAllDispatch = (clientId) => async dispatch => {
  try {
    const response = await api.getAllExecutives(clientId);
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
export const execInsightsDispatch = (execId, clientId) => async dispatch => {
  try {
    const response = await api.getExecInsightsData(execId, clientId);
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