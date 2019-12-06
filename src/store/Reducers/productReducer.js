const initialState = {
  products: {}
};
const prodReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return {
        ...state,
        products: action.payload
      };

    default:
      return state;
  }
};

export default prodReducer;
