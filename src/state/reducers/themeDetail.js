import { combineReducers } from 'redux'
import {
  THEME,
  GET_THEME_UNLOAD,
  DELETE_CHAPTER_LOADING,
  DELETE_CHAPTER_SUCCESS,
  DELETE_CHAPTER_FAILURE,
  MOVE_CHAPTER_THEME_LOADING,
  MOVE_CHAPTER_THEME_FAILURE,
  MOVE_CHAPTER_THEME_SUCCESS,
} from '../actions'
import makeStoryDetail from './hor/storyDetail'
import resetOn from './hor/resetOn';

const deletingChapters = (prevState = {}, { type, payload }) => {
  switch (type) {
    case DELETE_CHAPTER_LOADING:
      return {
        [payload.id]: true,
      }
    case DELETE_CHAPTER_SUCCESS:
    case DELETE_CHAPTER_FAILURE:
      return {
        [payload.id]: undefined,
      }
    default:
      return prevState
  }
}

const movingChapters = (prevState = {}, { type, payload }) => {
  switch (type) {
    case MOVE_CHAPTER_THEME_LOADING:
      return {
        [payload.chapterId]: true,
      }
    case MOVE_CHAPTER_THEME_SUCCESS:
    case MOVE_CHAPTER_THEME_FAILURE:
      return {
        [payload.chapterId]: undefined,
      }
    default:
      return prevState
  }
}

const reducer = combineReducers({
  deletingChapters,
  movingChapters,
  theme: makeStoryDetail(THEME)
});

export default resetOn(GET_THEME_UNLOAD, reducer);
