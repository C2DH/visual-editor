import { combineReducers } from 'redux';
import resetOn from './hor/resetOn';
import paginateCollection from './hor/paginateCollection';
import removeFromCollection from './hor/removeFromCollection';
import composeReducers from './composeReducers';
import {
  GET_DOCUMENTS,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_UNLOAD,
  DELETE_DOCUMENT_LOADING,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FAILURE
} from '../actions';

const facets = (prevState = null, { type, payload }) => {
  if (
    type === GET_DOCUMENTS_SUCCESS &&
    payload.facets &&
    Object.keys(payload.facets).length > 0
  ) {
    return payload.facets
  }
  return prevState
}

const deleting = (prevState = {}, { type, payload: docId }) => {
  switch(type) {
    case DELETE_DOCUMENT_LOADING:
      return {
        [docId]: true
      }
    case DELETE_DOCUMENT_SUCCESS:
    case DELETE_DOCUMENT_FAILURE:
      return {
        [docId]: undefined
      }
    default: return prevState;
  }
}

const reducer = combineReducers({
  facets,
  deleting,
  list: composeReducers(
    paginateCollection(GET_DOCUMENTS),
    removeFromCollection(DELETE_DOCUMENT_SUCCESS)
  )
});

export default resetOn(GET_DOCUMENTS_UNLOAD, reducer);
