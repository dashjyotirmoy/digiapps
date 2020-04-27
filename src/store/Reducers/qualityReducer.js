import * as actionType from "../actions/actionTypes";

const initialState = {
  currentRepo: "",
  qualityDrilledDownDetails: {},
  currentQualityData: {
    qualityDetails: {}
  }
};
const qualityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_QUALITY_DRILLED_DOWN_DETAILS:
      return {
        ...state,
        qualityDrilledDownDetails: action.payload.qualityDrilledDownDetails
      };
      // eslint-disable-next-line no-duplicate-case
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
      // eslint-disable-next-line no-duplicate-case

    default:
      return state;
  }
};

export default qualityReducer;
