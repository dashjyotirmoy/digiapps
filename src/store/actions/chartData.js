import * as actionTypes from "./actionTypes";
import api from "../../utility/Http/devOpsApis";

export const chartDataDispatch = (
  clientId,
  execId,
  projectId,
  sourceTypeId,
  sprintId,
  teamID
) => async dispatch => {
  try {
    const response = await api.getVelocityData(
      clientId,
      execId,
      projectId,
      sourceTypeId,
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

export const velocityProjectDataDispatch = (projectId,clientId,sourceType) =>
  async dispatch => {
    try {
      if (projectId) {
        const response = await api.getVelocityProjectData(projectId,clientId,sourceType);
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

  export const velocityBuildDataDispatch = (projectId,clientId,repoId,sourceTypeId) => 
  async dispatch => {
    try {
      const response = await api.getVelocityBuildData(projectId,clientId,repoId,sourceTypeId);
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
export const currentThemeSelected = type => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_THEME,
    payload: {
      currentTheme: type
    }
  });
};

export const velocityRepoDropValDispatch = type => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_REPO,
    payload: {
      currentRepo: type
    }
  });
};
