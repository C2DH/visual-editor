import { combineReducers } from 'redux'
import {
  CHAPTER,
  GET_CHAPTER_UNLOAD,
  DELETE_MODULE_CHAPTER_LOADING,
  DELETE_MODULE_CHAPTER_FAILURE,
  DELETE_MODULE_CHAPTER_SUCCESS,
  MOVE_MODULE_CHAPTER_LOADING,
  MOVE_MODULE_CHAPTER_FAILURE,
  MOVE_MODULE_CHAPTER_SUCCESS,
} from '../actions'
import makeStoryDetail from './hor/storyDetail'
import resetOn from './hor/resetOn';

const deletingModules = (prevState = {}, { type, payload }) => {
  switch (type) {
    case DELETE_MODULE_CHAPTER_LOADING:
      return {
        [payload.moduleIndex]: true,
      }
    case DELETE_MODULE_CHAPTER_SUCCESS:
    case DELETE_MODULE_CHAPTER_FAILURE:
      return {
        [payload.moduleIndex]: undefined,
      }
    default:
      return prevState
  }
}

const movingModules = (prevState = {}, { type, payload }) => {
  switch (type) {
    case MOVE_MODULE_CHAPTER_LOADING:
      return {
        [payload.moduleIndex]: true,
      }
    case MOVE_MODULE_CHAPTER_SUCCESS:
    case MOVE_MODULE_CHAPTER_FAILURE:
      return {
        [payload.moduleIndex]: undefined,
      }
    default:
      return prevState
  }
}

const reducer = combineReducers({
  deletingModules,
  movingModules,
  chapter: makeStoryDetail(CHAPTER),
})

export default resetOn(GET_CHAPTER_UNLOAD, reducer);
