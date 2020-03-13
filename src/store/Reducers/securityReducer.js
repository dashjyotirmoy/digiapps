import * as actionType from "../actions/actionTypes";

const initialState = {
    currentRepo: "",
    currentQualityData: {
      qualityDetails: {}
    }
};
const securityReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.SET_CURRENT_REPO:
        return {
          ...state,
          currentRepo: action.payload.currentRepo
        };
      case actionType.SET_SECURITY_DETAILS:
        return {
          ...state,
          currentSecurityData: {
            securityDetails: action.payload.securityDetails
          }
        };
  
      default:
        return state;
    }
  };
  
  export default securityReducer;
  