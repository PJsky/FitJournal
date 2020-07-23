import calendarReducers from './calendar';
import mainPanelReducers from './main-panel';
import userReducer from './auth/auth';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    ...calendarReducers,
    ...mainPanelReducers,
    user:userReducer
});

export default allReducers;