import calendarReducers from './calendar';
import mainPanelReducers from './main-panel';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    ...calendarReducers,
    ...mainPanelReducers
});

export default allReducers;