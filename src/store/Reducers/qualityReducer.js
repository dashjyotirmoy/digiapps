import * as actionType from "../actions/actionTypes";

const initialState = {
  currentRepo: "",
  qualityDrilledDownDetails: {},
  qualityDrilledDownFilterDetails:{},
  qualityBuildDetails: {},
  qualityBuildReleaseDetails:{},
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
      case actionType.SET_QUALITY_DRILLED_DOWN_FILTER_DETAILS:
      return {
        ...state,
        qualityDrilledDownFilterDetails: action.payload.qualityDrilledDownFilterDetails
      };
      // eslint-disable-next-line no-duplicate-case
      case actionType.SET_CURRENT_REPO:
      return {
        ...state,
        currentRepo: action.payload.currentRepo
      };
      // eslint-disable-next-line no-duplicate-case
      case actionType.SET_QUALITY_BUILD_DETAILS:
        return {
          ...state,
          qualityBuildDetails: action.payload.qualityBuildDetails
        };
      case actionType.SET_QUALITY_RELEASE_DETAILS:
        return {
          ...state,
          qualityBuildReleaseDetails: action.payload.qualityBuildReleaseDetails
        };
    case actionType.SET_QUALITY_DETAILS:
      return {
        ...state,
        currentQualityData: {
          qualityDetails: action.payload.qualityDetails
        }
      };
      case actionType.LOAD_QUALITY_DETAILS:
        return {
          ...state,
          qualityDetails: action.payload.qualityDetails
        };
      // eslint-disable-next-line no-duplicate-case

    default:
      return state;
  }
};

export default qualityReducer;
