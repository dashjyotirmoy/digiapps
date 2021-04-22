import * as actionType from "../actions/actionTypes";

const initialState = {
  buildPullProjectDetails: "",
  buildReleaseProjectDetails: ""
};
const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_BUILD_RELEASE_PULL_DETAILS:
      return {
        ...state,
        buildPullProjectDetails: action.payload.buildPullProjectDetails
      };
      case actionType.SET_BUILD_RELEASE_DETAILS:
      return {
        ...state,
        buildReleaseProjectDetails: action.payload.buildReleaseProjectDetails
      };
    default:
      return state;
  }
};

export default chartReducer;
