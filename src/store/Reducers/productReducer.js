import * as actionType from "../actions/actionTypes";

const initialState = {
  resetRepo: "",
  projectID: "",
  currentProject: {
    projectDetails: {},
    projectDataReceived: false
  },
  currentSprint: {
    sprintInfo: {},
    sprintReceived: false
  },
  currentProjectSprint: {
    sprintInfo: {},
    sprintReceived: false
  }
};
const prodReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CURRENT_REPO:
      return {
        ...state,
        resetRepo: action.payload.resetRepo
      };
    case actionType.LOAD_PRODUCTS:
      return {
        ...state,
        currentProject: {
          projectDetails: action.payload.projectDetails,
          projectDataReceived: action.payload.projectDataReceived
        }
      };
    case actionType.LOAD_CURRENT_SPRINT:
      return {
        ...state,
        currentSprint: {
          sprintInfo: action.payload.data.sprintDetails[0],
          teamId: action.payload.data.teamId,
          sprintReceived: action.payload.sprintReceived
        }
      };
      case actionType.LOAD_CURRENT_PROJECT_SPRINT:
      return {
        ...state,
        currentProjectSprint: {
          sprintInfo: action.payload.data.sprintDetails[0],
          sprintReceived: action.payload.sprintReceived
        }
      };
    default:
      return state;
  }
};

export default prodReducer;
