import {
  UPDATE_SETTINGS,
} from '../actions'

const defaultState = {
  // ...
  language: 'fr_FR',
  // ...
}

export default (prevState = defaultState, { type, payload }) => {
  switch (type) {
    case UPDATE_SETTINGS:
      return {
        ...prevState,
        ...payload,
      }
    default:
      return prevState
  }
}
