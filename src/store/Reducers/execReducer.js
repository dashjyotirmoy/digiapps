const initialState = {
  executiveInfo: {},
  clientlist: [],
  currentClientId: "",
  widgetList:[],
  executiveId: "",
  currentExecutiveInfo: {
    executiveData: {},
    executiveDataReceived: false
  }
};
const dimReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CLIENT_ID_DATA":
      return {
        ...state,
        // clientlist: action.payload.getAllClient.clientsList,
        currentClientId: action.payload.currentClientID
      };
      case "GET_WIDGET_LIST_DATA":
      return {
        ...state,
        // clientlist: action.payload.getAllClient.clientsList,
        widgetList: action.payload.getAllWidgetList.metrics
      };
    case "GET_EXEC_DATA":
      return {
        ...state,
        executiveInfo: action.payload.getAllExec,
        executiveId: action.payload.getAllExec[0].id
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