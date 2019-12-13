import * as actionTypes from "./actionTypes";
import api from "../../Utility/Http/devOpsApis";

export const sprintInsightsDispatch = (
  sprintId,
  execId,
  projectId
) => async dispatch => {
  api
    .getSprintInsightsData(sprintId, execId, projectId)
    .then(response => {
      dispatch({
        type: actionTypes.LOAD_CURRENT_SPRINT,
        payload: {
          data: response.data,
          sprintReceived: true
        }
      });
    })
    .catch(error => {
      console.log(error.message);
    });
};
