import {
  DELETE_DOCUMENT_FAILURE,
  CLOSE_ERROR
} from '../../actions'

export default (prevState = null, { type, error }) => {
  switch (type) {
  case DELETE_DOCUMENT_FAILURE:
    return error.response.body.detail;
  case CLOSE_ERROR:
    return null;
  default:
    return prevState
  }
}
