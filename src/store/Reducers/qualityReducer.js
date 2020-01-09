import * as actionType from "../actions/actionTypes";

const initialState = {
  currentRepo: "",
  currentQualityData: {
    qualityDetails: {}
  }
};
const qualityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CURRENT_REPO:
      return {
        ...state,
        currentRepo: action.payload.currentRepo
      };
    case actionType.SET_QUALITY_DETAILS:
      return {
        ...state,
        currentQualityData: {
          qualityDetails: action.payload.qualityDetails
        }
      };

    default:
      return state;
  }
};

export default qualityReducer;
