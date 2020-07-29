import { combineReducers } from 'redux';
import resetOn from './hor/resetOn';
import paginateCollection from './hor/paginateCollection';
import {
  GET_DOCUMENTS,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_UNLOAD
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

const reducer = combineReducers({
  facets,
  list: paginateCollection(GET_DOCUMENTS)
});

export default resetOn(GET_DOCUMENTS_UNLOAD, reducer);
