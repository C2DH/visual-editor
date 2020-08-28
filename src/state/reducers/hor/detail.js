// Hight Order Reducer for a story detail!

export const defaultState = {
  id: null,
  loading: false,
  error: null
}

const makeDetail = entityType => {

  const reducer = (prevState = defaultState, { type, payload, error }) => {
    switch (type) {
      case `GET_${entityType}_SUCCESS`:
        return {
          ...prevState,
          loading: false,
          id: payload.id
        }
      case `GET_${entityType}_LOADING`:
        return {
          ...prevState,
          loading: true,
          error: null
        }
      case `GET_${entityType}_FAILURE`:
        return {
          ...prevState,
          error,
          loading: false
        }
      default:
        return prevState;
    }
  }

  return reducer;
}

export default makeDetail;
