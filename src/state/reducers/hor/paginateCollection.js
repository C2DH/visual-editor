import { uniq } from 'lodash'
import { normalizeCollection } from '../../utils'

const defaultState = {
  loading: false,
  error: null,
  // null instead of [] to discriminating the inital state by the empy state
  ids: null,
  pagination: {
    count: null,
    offset: 0,
  },
}

export default (actionType, config = { byKey: 'id' }) => {
  const reducer = (prevState = defaultState, { type, payload, error }) => {
    switch (type) {
      case `${actionType}_SUCCESS`: {
        const { reset, results, count, offset } = payload
        const fresh = normalizeCollection(results, config.byKey)

        return {
          ...prevState,
          loading: false,
          ids: reset ? fresh.ids : uniq(prevState.ids.concat(fresh.ids)),
          pagination: {
            count,
            offset,
          },
        }
      }
      case `${actionType}_LOADING`:
        return {
          ...prevState,
          loading: true,
          error: null,
        }
      case `${actionType}_FAILURE`:
        return {
          ...prevState,
          loading: false,
          error,
        }
      default:
        return prevState
    }
  }

  return reducer
}
