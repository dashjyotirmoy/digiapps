const initialState = {
  executiveId: "4c78ede2-1be2-66e5-8dc7-bc89cc8dfe0f",
  currentExecutiveInfo: {
    executiveData: {},
    executiveDataReceived: false
  }
};
const dimReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EXECUTVE_ID':
      return {
        ...state,
        executiveId: action.payload.executiveId
      };
    case "SET_EXEC_DATA":
      return {
        ...state,
        currentExecutiveInfo: {
          executiveData: action.payload.executiveData,
          executiveDataReceived: action.payload.executiveDataReceived
        }
      };
    default:
      return state;
  }
};

export default dimReducer;