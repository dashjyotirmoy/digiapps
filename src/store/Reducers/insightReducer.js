import * as actionType from "../actions/actionTypes";

const initialState = {
    securityDetails: {},
    velocityInsightDetails: {},
    qualityDetails: {},
    projectDropdownDetails:[],
    branchDropdownDetails:[]
};
const insightReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.LOAD_SECURITY_DETAILS:
        return {
          ...state,
          securityDetails: action.payload.securityDetails
        };
      case actionType.LOAD_VELOCITY_DETAILS:
        return {
          ...state,
          velocityInsightDetails: action.payload.velocityInsightDetails
        };
        case actionType.LOAD_QUALITY_DETAILS:
          return {
            ...state,
            qualityDetails: action.payload.qualityDetails
          };
          case actionType.LOAD_PROJECT_DROPDOWN_DETAILS:
            return {
              ...state,
              projectDropdownDetails: action.payload.projectDropdownDetails
            };
          case actionType.LOAD_BRANCH_DROPDOWN_DETAILS:
              return {
                ...state,
                branchDropdownDetails: action.payload.branchDropdownDetails
              }
          
      default:
        return state;
    }
  };
  
  export default insightReducer;
  