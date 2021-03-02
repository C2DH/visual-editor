import {
  STATIC_STORY,
  GET_STATIC_STORY_UNLOAD
} from '../actions'
import makeStoryDetail from './hor/storyDetail'
import resetOn from './hor/resetOn';

export default resetOn(GET_STATIC_STORY_UNLOAD, makeStoryDetail(STATIC_STORY));
