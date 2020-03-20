import * as actionType from "../actions/actionTypes";

const initialState = {
    currentRepo: "",
    securityProjectDetails: {},
    securityRepoDetails: {},
    securityPolicyDetails: {},
    securityAlertDetails: {}
};
const securityReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.SET_CURRENT_REPO:
        return {
          ...state,
          currentRepo: action.payload.currentRepo
        };
      case actionType.SET_SECURITY_PROJECT_DETAILS:
        return {
          ...state,
            securityProjectDetails: action.payload.securityProjectDetails
        };
        case actionType.SET_SECURITY_REPO_DETAILS:
          return {
            ...state,
              securityRepoDetails: action.payload.securityRepoDetails
          }
          case actionType.SET_SECURITY_POLICY_DETAILS:
          return {
            ...state,
              securityPolicyDetails: action.payload.securityPolicyDetails
          }
          case actionType.SET_SECURITY_ALERT_DETAILS:
          return {
            ...state,
              securityAlertDetails: action.payload.securityAlertDetails
          }
  
      default:
        return state;
    }
  };
  
  export default securityReducer;
  