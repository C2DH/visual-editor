import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./saga";

const preloadedState = {
  // Hardcoed \w endless love
  languages: [
    {
      label: "EN",
      code: "en_US",
      description: "English",
    },
    {
      label: "DE",
      code: "de_DE",
      description: "German",
    },
    {
      label: "FR",
      code: "fr_FR",
      description: "French",
    },
    {
      label: "NL",
      code: "nl_BE",
      description: "Belgian Dutch",
    },
  ],
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  )
);
sagaMiddleware.run(rootSaga);

// TODO: Move in other place
export const wrapAuthApiCall = (apiFn) => (...args) =>
  apiFn(store.getState().auth.accessToken)(...args);

export default store;
