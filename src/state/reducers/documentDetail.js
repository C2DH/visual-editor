import { combineReducers } from 'redux';
import {
  DOCUMENT,
  GET_DOCUMENT_UNLOAD,
  LOAD_DOCUMENT_SCHEMA_LOADING,
  LOAD_DOCUMENT_SCHEMA_SUCCESS,
  LOAD_DOCUMENT_SCHEMA_FAILURE
} from '../actions';
import makeDetail from './hor/detail';
import resetOn from './hor/resetOn';

const defaultState = {
  payload: null,
  loading: false,
  error: null
}

const schema = (prevState = defaultState, { type, payload, error }) => {
  switch(type) {
    case LOAD_DOCUMENT_SCHEMA_SUCCESS:
      return {
        ...prevState,
        loading: false,
        payload
      }
    case LOAD_DOCUMENT_SCHEMA_LOADING:
      return {
       ...prevState,
       error: null,
       loading: true
      }
    case LOAD_DOCUMENT_SCHEMA_FAILURE:
      return {
        ...prevState,
        loading: false,
        error: `Error loading the schema ${error.response.req.url}: ${error.response.status} ${error.response.statusText}`
      }
    default:
      return prevState;
  }
}

const reducer = combineReducers({
  schema,
  document: resetOn(GET_DOCUMENT_UNLOAD, makeDetail(DOCUMENT))
});

export default reducer;
