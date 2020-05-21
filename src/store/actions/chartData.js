import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const chartDataDispatch = (
  execId,
  projectId,
  sprintId,
  teamID
) => async dispatch => {
  try {
    const response = await api.getVelocityData(
      execId,
      projectId,
      sprintId,
      teamID
    );
    dispatch({
      type: actionTypes.SET_CHARTS_DETAILS,
      payload: {
        chartDetails: response.data,
        chartDataReceived: true
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const velocityProjectDataDispatch = (projectId) =>
  async dispatch => {
    try {
      if (projectId) {
        const response = await api.getVelocityProjectData(projectId);
        console.log('ddddddsssssssssssssszzzzzzzzzzz', response);
        dispatch({
        type: actionTypes.SET_VELOCITY_PROJECT_DETAILS,
        payload: {
          velocityProjectDetails: response.data,
          chartDataReceived: true
        }
      });
      }
      
    } catch (error) {
      console.error(error);
    }
  };

export const currentTabDispatch = type => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_TAB,
    payload: {
      currentTab: type
    }
  });
};
