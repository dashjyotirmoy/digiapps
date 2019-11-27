import {
  faArrowLeft,
  faCircle,
  faArrowUp,
  faArrowDown,
  faTh
} from "@fortawesome/free-solid-svg-icons";
const dimReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_MAINMETRIC":
      return action.payload;
    default:
      return state;
  }
};

export default dimReducer;
