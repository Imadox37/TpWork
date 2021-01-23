import { combineReducers } from 'redux';
import  { postReducers} from './postsReducers';


export default combineReducers({   
    posts : postReducers
});
