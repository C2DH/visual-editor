import {
  EDUCATIONAL,
  GET_EDUCATIONAL_UNLOAD
} from '../actions';
import storyDetail from './hor/storyDetail';
import resetOn from './hor/resetOn';

export default resetOn(GET_EDUCATIONAL_UNLOAD, storyDetail(EDUCATIONAL));
