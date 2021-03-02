import makeDetail, { defaultState as detailDefaultState } from './detail';

const defaultState = {
  ...detailDefaultState,
  saving: false
}

// Hight Order Reducer for a story detail!
const makeStoryDetail = storyType => {

  const detailReducer = makeDetail(storyType);
  const reducer = (prevState = defaultState, action) => {
    switch (action.type) {
      case `PUBLISH_${storyType}_LOADING`:
      case `UNPUBLISH_${storyType}_LOADING`:
        return {
          ...prevState,
          saving: true,
        }
      case `PUBLISH_${storyType}_FAILURE`:
      case `UNPUBLISH_${storyType}_FAILURE`:
        return {
          ...prevState,
          saving: false,
        }
      case `UNPUBLISH_${storyType}_SUCCESS`:
      case `PUBLISH_${storyType}_SUCCESS`:
        return {
          ...prevState,
          saving: false
        }
      default:
        return detailReducer(prevState, action);
    }
  }

  return reducer;
}

export default makeStoryDetail;
