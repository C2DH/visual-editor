import { UPDATE_SETTINGS } from "../actions";

const defaultState = {
  // ...
  language: "de_DE",
  // ...
};

export default (prevState = defaultState, { type, payload }) => {
  switch (type) {
    case UPDATE_SETTINGS:
      return {
        ...prevState,
        ...payload,
      };
    default:
      return prevState;
  }
};
