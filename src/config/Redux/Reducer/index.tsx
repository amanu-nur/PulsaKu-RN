import {combineReducers} from 'redux';
import {messageReducer} from './message';

const reducer = combineReducers({messageReducer});

export default reducer;
