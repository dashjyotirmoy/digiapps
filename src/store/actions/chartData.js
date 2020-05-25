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

  export const velocityBuildDataDispatch = (projectId, repoId) => 
  async dispatch => {
    try {
      const response = await api.getVelocityBuildData(projectId, repoId);
      dispatch({
        type: actionTypes.SET_VELOCITY_BUILD_DETAILS,
        payload: {
          velocityBuildDetails: response.data,
          chartDataReceived: true
        }
      });
    } catch(error) {
      console.error(error);
    }
  }

export const currentTabDispatch = type => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_TAB,
    payload: {
      currentTab: type
    }
  });
};

export const velocityRepoDropValDispatch = type => dispatch => {
  console.log('ddddddddddddddddxxxxxxxxxxiiiiii', type);
  dispatch({
    type: actionTypes.SET_CURRENT_REPO,
    payload: {
      currentRepo: type
    }
  });
};
