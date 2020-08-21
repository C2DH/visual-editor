import { combineReducers } from 'redux'
import resetOn from '../hor/resetOn'
import {
  GET_DOCUMENTS_UNLOAD,
  CHOOSE_DOCUMENT,
  SELECT_DOCUMENTS,
  SELECT_DOCUMENT,
  UNSELECT_DOCUMENT,
  UNSELECT_DOCUMENTS,
  UNSELECT_ALL_DOCUMENTS,
  SELECTION_DONE,
} from '../../actions'

const choosedDocument = (prevState = null, { type, payload }) => {
  switch (type) {
    case CHOOSE_DOCUMENT:
      return payload
    default:
      return prevState
  }
}

const selectedDocuments = (prevState = {}, { type, payload }) => {
  switch (type) {
    case SELECT_DOCUMENTS:
      return {
        ...prevState,
        ...payload.reduce((r, id) => ({ ...r, [id]: true }), {})
      }
    case SELECT_DOCUMENT:
      return {
        ...prevState,
        [payload]: true,
      }
    case UNSELECT_DOCUMENT:
      return {
        ...prevState,
        [payload]: undefined,
      }
    case UNSELECT_DOCUMENTS:
      return {
        ...prevState,
        ...payload.reduce((r, id) => ({ ...r, [id]: undefined }), {})
      }
    case UNSELECT_ALL_DOCUMENTS:
      return {}
    default:
      return prevState
  }
}

const selectionDone = (prevState = false, { type }) => {
  switch (type) {
    case SELECTION_DONE:
      return true
    default:
      return prevState
  }
}

const reducer = combineReducers({
  choosedDocument,
  selectedDocuments,
  selectionDone
})

export default resetOn(GET_DOCUMENTS_UNLOAD, reducer)
