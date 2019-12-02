const initialState = {
  executiveData: {}
};
const dimReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_MAINMETRIC":
      return {
        ...state,
        executiveData: action.payload
      };
    default:
      return state;
  }
};

export default dimReducer;
