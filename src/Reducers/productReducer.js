const prodReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return action.payload;

    default:
      return state;
  }
};

export default prodReducer;
