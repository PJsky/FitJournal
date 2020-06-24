import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {set_month, increment_month, decrement_month, set_day_of_year,set_calendar_months,set_calendar_days} from '../actions/calendar.js';
import Calendar from "./Left_side_panel_components/Calendar";

export default function Left_side_panel(){     
    const calendarState = useSelector(state => state.calendarYearAndMonth);
    const chosenDay = useSelector(state => state.calendarDayOfYear);
    const menuState = useSelector(state => state.calendarMenuState) 
    const dispatch = useDispatch();
    
    return(
        <div className="side-panel left-side-panel">
            <Calendar/>
            <div className="side-panel-card calorie-graph">
                <div className="calorie-graph-bar">
                <p>Calorie Graph</p>
                </div>
                <div className="calorie-graph-body"></div>
            </div>
        </div>
    )
}

