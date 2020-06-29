import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CalendarArrow from '../../images/calendar-arrow.svg'; 
import {set_month, increment_month, decrement_month, set_day_of_year,set_calendar_months,set_calendar_days, increment_year, decrement_year} from '../../actions/calendar.js';
import axios from 'axios';

export default function Calendar(){     
    const calendarState = useSelector(state => state.calendarYearAndMonth);
    const chosenDay = useSelector(state => state.calendarDayOfYear);
    const menuState = useSelector(state => state.calendarMenuState) 
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:3030/days/${chosenDay.year}-${chosenDay.month}-${chosenDay.day}`)
        .then(({data}) => {
            console.log(data);
        })
    })
    
    return(
        <div className="side-panel left-side-panel">
            <div className="side-panel-card calendar">
                <div className={menuState == "calendar_days" ? "calendar-body" : "calendar-body-hidden"}>
                    <div className="calendar-upper">
                        <p className="calendar-month-year-text" onClick={() => dispatch(set_calendar_months())}>
                            {getMonthName(calendarState.month).toUpperCase()} {calendarState.year}
                        </p>
                        <div className="calendar-month-arrows">
                            <img src={CalendarArrow} id="reversed-arrow" onClick={() => dispatch(decrement_month(1))}></img>
                            <img src={CalendarArrow} id="arrow" onClick={() => dispatch(increment_month(1))}></img>
                        </div>
                    </div>
                    <div className="calendar-week-days">
                        {getWeek()}
                    </div>
                    <div className="calendar-month">
                        {getDays(dispatch, calendarState.year, calendarState.month, chosenDay)}
                    </div>
                </div>
                <div className={menuState == "calendar_months" ? "calendar-body-month-menu" : "calendar-body-hidden"}> 
                    <div className="calendar-upper">
                        <p className="calendar-year-text">
                            {calendarState.year}
                        </p>
                        <div className="calendar-month-arrows">
                            <img src={CalendarArrow} id="reversed-arrow" onClick={() => dispatch(decrement_year(1))}></img>
                            <img src={CalendarArrow} id="arrow" onClick={() => dispatch(increment_year(1))}></img>
                        </div>
                    </div>
                    <div className="calendar-months">
                        {getMonths(dispatch, calendarState.year, chosenDay)}
                    </div>
                </div>
            </div>
    </div>
    )
}

const getDays = (dispatch, currentYear, currentMonth, chosenDay) =>{
    let days = [];
    let weeks =[];
    let nrOfDays = getNumberOfDays(currentYear,currentMonth);
    let firstDayOfMonth = getStartOfTheMonth(currentYear,currentMonth);
    let lastDayOfPrevMonth = getNumberOfDays(currentYear,currentMonth-1);

    //This month days
    for(let i=0; i<nrOfDays;i++){
        days.push(
            <span className={
                i+1==chosenDay.day && currentMonth == chosenDay.month && currentYear == chosenDay.year ? 'chosen-day calendar-day' : 'calendar-day'
             }
             onClick={()=>dispatch(set_day_of_year({
                day: i+1,
                month: currentMonth,
                year: currentYear
            }))}>{i+1}</span>
        );
    }

    //Previous month days from the starting week
    for(let i=0; i<firstDayOfMonth;i++)
        days.unshift(
            <span className="calendar-day-off">{lastDayOfPrevMonth-i}</span>
        )

        let daysLeftInCalendar = 7 * 6 -days.length;
    for(let i=0; i<daysLeftInCalendar;i++)
            days.push(
                <span className='calendar-day-off'>{i+1}</span>
            )

    for(let i = 0; i<6; i++){
        weeks.push(
            <div className="calendar-week">
                {days.slice(7*i, 7+ 7*i)}
            </div>
        )
    }
    return weeks;
}

//get number of days in a month
const getNumberOfDays = (year,month) => (42 - new Date(year, month-1,7*6).getDate());

//gets first day of month  0-6 : Sun-Sat
const getStartOfTheMonth = (year,month) => new Date(year, month-1).getDay();

const chooseMonth = (dispatch,month) => {
    dispatch(set_month(month));
    dispatch(set_calendar_days())
}

const getMonths= (dispatch, currentYear, chosenDay) =>{
    let months = [];
    for(let month = 1; month<=12;month++)
        months.push(
            <div className={currentYear==chosenDay.year && month == chosenDay.month? "calendar-months-chosen-month": "calendar-months-month"} onClick={() => chooseMonth(dispatch,month)}>
                {getMonthName(month)}
            </div>
        );

    return months;
}

const getMonthName = (number) =>{
    if(number>12 || number <=0) return 'Months are represended by 1-12 numbers';
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Oct','Dec'];
    return months[number-1];

}

const getDayName = (number) =>{
    if(number>7 || number <=0) return 'Days are represended by 1-7';
    let days = ['Sat', 'Mon', 'Tue' ,'Wed', 'Thu', 'Fri', 'Sun'];
    return days[number-1];
}

const getWeek = () =>{
    let weekDays = [];
    for(let day=1; day<=7;day++)
        weekDays.push(
            <div>{getDayName(day).toUpperCase()}</div>
        )
    return weekDays;
}