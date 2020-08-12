import { combineReducers } from 'redux'
import fullPageWidgets from './fullPageWidgets'
import error from './error';

export default combineReducers({
  fullPageWidgets,
  error
})
