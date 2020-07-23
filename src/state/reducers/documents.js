import { combineReducers } from 'redux';
import resetOn from './hor/resetOn';
import paginateCollection from './hor/paginateCollection';
import {
  GET_DOCUMENTS,
  GET_DOCUMENTS_UNLOAD
} from '../actions';

const reducer = combineReducers({
  list: paginateCollection(GET_DOCUMENTS)
});

export default resetOn(GET_DOCUMENTS_UNLOAD, reducer);
