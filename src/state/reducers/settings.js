import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { UPDATE_SETTINGS } from "../actions";
import { DEFAULT_LANGUAGE } from '../consts';

const defaultState = {
  // ...
  language: DEFAULT_LANGUAGE,
  // ...
};

const reducer = (prevState = defaultState, { type, payload }) => {
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

export default persistReducer({key: 'settings', storage}, reducer);
