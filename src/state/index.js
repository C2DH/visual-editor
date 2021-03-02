import { createStore, compose, applyMiddleware } from "redux";
import { persistStore } from 'redux-persist';
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  )
);
persistStore(store);
sagaMiddleware.run(rootSaga);

// TODO: Move in other place
export const wrapAuthApiCall = (apiFn) => (...args) =>
  apiFn(store.getState().auth.accessToken)(...args);

export default store;
