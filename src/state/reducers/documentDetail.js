import {
  DOCUMENT,
  GET_DOCUMENT_UNLOAD
} from '../actions';
import makeDetail from './hor/detail';
import resetOn from './hor/resetOn';

export default resetOn(GET_DOCUMENT_UNLOAD, makeDetail(DOCUMENT));
