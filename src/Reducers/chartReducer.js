const initialState = {
  chartsData: {}
};
const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_CHARTS":
      return {
        ...state,
        chartsData: action.payload
      };

    default:
      return state;
  }
};

export default chartReducer;
