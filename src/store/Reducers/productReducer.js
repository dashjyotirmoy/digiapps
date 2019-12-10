const initialState = {
  currentProject: {
    projectDetails: {},
    projectDataReceived: false
  },
  currentSprint: {
    sprintInfo: {},
    sprintReceived: false
  }
};
const prodReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return {
        ...state,
        currentProject: {
          projectDetails: action.payload.projectDetails,
          projectDataReceived: action.payload.projectDataReceived
        }
      };
    case "LOAD_CURRENT_SPRINT":
      return {
        ...state,
        currentSprint: {
          sprintInfo: action.payload.data,
          sprintReceived: action.payload.sprintReceived
        }
      };

    default:
      return state;
  }
};

export default prodReducer;
